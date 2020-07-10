import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { MessageBox } from './MessageBox';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventSubmission } from './EventSubmission';
import { ApiLocation, EventInfo, Roles } from '../../types';
import { EventOptionLocation } from './EventOptionLocation';
import { EventTemplate } from './EventTemplate';
import { useKeycloak } from '@react-keycloak/web';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

const Body = styled.div`
    display: flex;
    flex-direction: row;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

/**
 * Component shown when event in calendar is clicked.
 * Will be rendered differently depending on user's role.
 */
export const Event: React.FC<EventInfo> = (props) => {
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
        //TODO: Submit to server
        setIsEditing(false);
    };

    return (
        <EventTemplate
            title={props.title}
            showEditSymbol={keycloak.authenticated}
            isEditing={isEditing}
            onEditClick={onEditClick}
        >
            <Body>
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
                    />
                    <EventOptionLocation
                        isEditing={isEditing}
                        selectedLocation={locationId}
                        locations={locations}
                        onChange={onLocationChange}
                    />
                </Options>
                {props.resource && props.resource.message && !isEditing ? (
                    <MessageBox {...props.resource.message} />
                ) : null}
            </Body>
            {isEditing ? <EventSubmission onSubmit={onSubmit} onCancel={onCancel} /> : null}
        </EventTemplate>
    );
};
