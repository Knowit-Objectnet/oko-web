import * as React from 'react';
import styled from 'styled-components';
import { EventSubmission } from './EventSubmission';
import { useState } from 'react';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventOptionLocation } from './EventOptionLocation';
import { EventTemplate } from './EventTemplate';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { EventOptionPartner } from './EventOptionPartner';
import { ApiLocation, ApiPartner } from '../../types';

const Options = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

interface NewEventProps {
    start: Date;
    end: Date;
    onFinished: () => void;
}

/**
 * Component shown when a range is selected in calendar or new event button clciked.
 * Will only be rendered for Oslo Kommune.
 */
export const NewEvent: React.FC<NewEventProps> = (props) => {
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
    // Valid partners fetched from api
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    let { data: partners } = useSWR<ApiPartner[]>(['/api/partners', keycloak.token], fetcher);
    partners =
        partners && partners.length !== 0
            ? partners
            : [
                  {
                      id: 1,
                      name: 'Fretex',
                  },
                  {
                      id: 2,
                      name: 'Maritastiftelsen',
                  },
                  {
                      id: 3,
                      name: 'Jobben',
                  },
              ];
    // State
    const [selectedPartnerId, setSelectedPartnerId] = useState(-1);
    const [dateRange, setDateRange] = useState<[Date, Date]>([props.start, props.end]);
    const [timeRange, setTimeRange] = useState<[Date, Date]>([props.start, props.end]);
    const [recurring, setReccuring] = useState<'None' | 'Daily' | 'Weekly'>('None');
    const [selectedDays, setSelectedDays] = useState([1]);
    const [locationId, setLocationId] = useState(-1);

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

    // On change for Partner selection
    const onPartnerChange = (partnerId: number) => {
        setSelectedPartnerId(partnerId);
    };

    // On change for Location selection
    const onLocationChange = (_locationId: number) => {
        setLocationId(_locationId);
    };

    // Function called if edit was cancelled. Resets all values to the original event info
    const onCancel = () => {
        props.onFinished();
    };

    // Function called on successful event edit.
    const onSubmit = () => {
        //TODO: Submit to server
        props.onFinished();
    };

    return (
        <EventTemplate title="Opprett ny avtale" showEditSymbol={false} isEditing={false}>
            <Options>
                <EventOptionPartner
                    selectedPartner={selectedPartnerId}
                    partners={partners}
                    onChange={onPartnerChange}
                />
                <EventOptionLocation
                    isEditing={true}
                    selectedLocation={locationId}
                    locations={locations}
                    onChange={onLocationChange}
                />
                <EventOptionDateRange
                    dateRange={dateRange}
                    timeRange={timeRange}
                    recurring={recurring}
                    selectedDays={selectedDays}
                    isEditing={true}
                    onDateRangeChange={onDateRangeChange}
                    onTimeRangeChange={onTimeRangeChange}
                    onRecurringChange={onRecurringChange}
                    onSelectedDaysChange={onSelectedDaysChange}
                />
            </Options>
            <EventSubmission onSubmit={onSubmit} onCancel={onCancel} />
        </EventTemplate>
    );
};
