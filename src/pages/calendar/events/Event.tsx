import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { MessageBox } from './MessageBox';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventSubmission } from './EventSubmission';
import { ApiLocation, Colors, EventInfo, Roles } from '../../../types';
import { EventOptionLocation } from './EventOptionLocation';
import { HorizontalEventTemplate } from './HorizontalEventTemplate';
import { useKeycloak } from '@react-keycloak/web';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { useAlert, types } from 'react-alert';

const Body = styled.div`
    display: flex;
    flex-direction: row;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    &:nth-child(2) {
        margin-left: 10px;
    }
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const DeleteButton = styled.button`
    background-color: ${Colors.Red};
    height: 45px;
    border: none;
    margin-top: 10px;
`;

interface EventProps extends EventInfo {
    deleteEvent: (event: EventInfo) => void;
    updateEvent: (eventId: number, start: string, end: string) => void;
}

/**
 * Component shown when event in calendar is clicked.
 * Will be rendered differently depending on user's role.
 */
export const Event: React.FC<EventProps> = (props) => {
    // Alert dispatcher
    const alert = useAlert();
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Valid recycling stations (ombruksstasjon) locations fetched from api
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    let { data: locations } = useSWR<ApiLocation[]>(['/api/locations', keycloak.token], fetcher);
    locations =
        locations && locations.length !== 0
            ? locations
            : [
                  {
                      id: 1,
                      name: 'Haraldrud',
                  },
                  {
                      id: 2,
                      name: 'Smestad',
                  },
                  {
                      id: 3,
                      name: 'Grefsen',
                  },
                  {
                      id: 4,
                      name: 'Grønmo',
                  },
                  {
                      id: 5,
                      name: 'Ryen',
                  },
              ];
    // State
    const [isEditing, setIsEditing] = useState(false);
    const [dateRange, setDateRange] = useState<[Date, Date]>([props.start, props.end]);
    const [timeRange, setTimeRange] = useState<[Date, Date]>([props.start, props.end]);
    const [recurring, setReccuring] = useState<'None' | 'Daily' | 'Weekly'>('None');
    const [selectedDays, setSelectedDays] = useState([1]);
    const [locationId, setLocationId] = useState(props.resource?.location ? props.resource?.location?.id : -1);

    // On change functions for DateRange
    const onDateRangeChange = (range: [Date, Date]) => {
        setDateRange(range);
    };

    const onTimeRangeChange = (range: [Date, Date]) => {
        setTimeRange(range);
    };

    const onRecurringChange = (value: 'None' | 'Daily' | 'Weekly') => {
        setReccuring(value);
    };

    const onSelectedDaysChange = (num: Array<number>) => {
        setSelectedDays(num);
    };

    // On change function for the Location component
    const onLocationChange = (locationId: number) => {
        setLocationId(locationId);
    };

    // On change function for the Edit button
    const onEditClick = () => {
        setIsEditing(true);
    };

    const onDelete = () => {
        const { deleteEvent, ...rest } = props;
        deleteEvent(rest);
    };

    // Function called if edit was cancelled. Resets all values to the original event info
    const onCancel = () => {
        setIsEditing(false);
        setDateRange([props.start, props.end]);
        setTimeRange([props.start, props.end]);
        if (locations) {
            setLocationId(props.resource?.location ? props.resource?.location?.id : -1);
        }
    };

    // Function called on successful event edit.
    const onSubmit = () => {
        const start = new Date(dateRange[0]);
        const end = new Date(dateRange[1]);
        start.setHours(
            timeRange[0].getHours(),
            timeRange[0].getMinutes(),
            timeRange[0].getSeconds(),
            timeRange[0].getMilliseconds(),
        );
        end.setHours(
            timeRange[1].getHours(),
            timeRange[1].getMinutes(),
            timeRange[1].getSeconds(),
            timeRange[1].getMilliseconds(),
        );

        const min = new Date(start);
        min.setHours(8, 0, 0, 0);
        const max = new Date(end);
        max.setHours(20, 0, 0, 0);

        if (start > end) {
            alert.show('Start tiden kan ikke vøre etter slutt tiden.', { type: types.ERROR });
            return;
        }

        if (start < min) {
            alert.show('Starttiden kan ikke være før 08:00', { type: types.ERROR });
            return;
        }

        if (end > max) {
            alert.show('Sluttiden kan ikke være etter 20:00', { type: types.ERROR });
            return;
        }

        props.updateEvent(props.resource.eventId, start.toISOString(), end.toISOString());
        setIsEditing(false);
    };

    return (
        <HorizontalEventTemplate
            title={props.title}
            showEditSymbol={keycloak.authenticated}
            isEditing={isEditing}
            onEditClick={onEditClick}
        >
            <Body>
                <Section>
                    <Options>
                        <EventOptionDateRange
                            dateRange={dateRange}
                            timeRange={timeRange}
                            recurring={recurring}
                            selectedDays={selectedDays}
                            isEditing={isEditing}
                            onDateRangeChange={onDateRangeChange}
                            onTimeRangeChange={onTimeRangeChange}
                            onRecurringChange={onRecurringChange}
                            onSelectedDaysChange={onSelectedDaysChange}
                            recurrenceEnabled={false}
                        />
                        <EventOptionLocation
                            isEditing={false}
                            selectedLocation={locationId}
                            locations={locations}
                            onChange={onLocationChange}
                        />
                    </Options>
                </Section>
                {!isEditing ? (
                    <Section>
                        <MessageBox {...props.resource.message} />
                        {keycloak.hasRealmRole(Roles.Oslo) ||
                        (keycloak.hasRealmRole(Roles.Partner) &&
                            keycloak.tokenParsed.GroupID === props.resource.partner.id) ? (
                            <DeleteButton onClick={onDelete}>Avlys uttak</DeleteButton>
                        ) : null}
                    </Section>
                ) : null}
            </Body>
            {isEditing ? <EventSubmission onSubmit={onSubmit} onCancel={onCancel} /> : null}
        </HorizontalEventTemplate>
    );
};
