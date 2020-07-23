import * as React from 'react';
import styled from 'styled-components';
import { EventSubmission } from './EventSubmission';
import { useState } from 'react';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventOptionLocation } from './EventOptionLocation';
import { VerticalEventTemplate } from './VerticalEventTemplate';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { EventOptionPartner } from './EventOptionPartner';
import {ApiLocation, ApiPartner, apiUrl, Colors} from '../../../types';

const Options = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Submitbutton = styled.button`
    height: 35px;
    width: 350px;
    background-color: ${Colors.Green};
    border: none;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    margin-top: 40px;
`;

interface NewEventProps {
    start: Date;
    end: Date;
    onFinished: () => void;
    addEvent: (
        data: {
            startDateTime: string;
            endDateTime: string;
            station: { id: number };
            partner: { id: number };
            recurrenceRule?: {
                until: string;
                days?: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'>;
                count?: number;
                interval?: number;
            };
        },
        stationName: string,
        partnerName: string,
    ) => void;
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
    let { data: partners } = useSWR<ApiPartner[]>([`${apiUrl}/partner/partners/`, keycloak.token], fetcher);
    partners = partners || [];

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
    const onSubmit = async () => {
        // Cancel submission if token doesn't exist as they are not logged in
        if (!keycloak?.token) return;
        // Cancel submission if start time is bigger than end time
        if (timeRange[0] > timeRange[1]) return;
        // Cancel submission if the start time is less than the min time
        const min = new Date(timeRange[0]);
        min.setHours(8, 0, 0, 0);
        if (timeRange[0] < min) return;
        // Cancel submission if the end time is less than the min time
        const max = new Date(timeRange[1]);
        max.setHours(20, 0, 0, 0);
        if (timeRange[1] > max) return;

        // Dates has to be written as strings as we need to remove the Z, as ISO 8601 is not fully supported
        const data: {
            startDateTime: string;
            endDateTime: string;
            station: { id: number };
            partner: { id: number };
            recurrenceRule?: {
                until: string;
                days?: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'>;
                count?: number;
                interval?: number;
            };
        } = {
            startDateTime: timeRange[0].toISOString(),
            endDateTime: timeRange[1].toISOString(),
            station: {
                id: locationId,
            },
            partner: {
                id: selectedPartnerId,
            },
        };

        if (recurring === 'Daily') {
            data.recurrenceRule = {
                until: dateRange[1].toISOString(),
                days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
            };
        } else if (recurring === 'Weekly') {
            data.recurrenceRule = {
                until: dateRange[1].toISOString(),
            };

            const days: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'> = [];

            for (const day of selectedDays) {
                switch (day) {
                    case 1:
                        days.push('MONDAY');
                        break;
                    case 2:
                        days.push('TUESDAY');
                        break;
                    case 3:
                        days.push('WEDNESDAY');
                        break;
                    case 4:
                        days.push('THURSDAY');
                        break;
                    case 5:
                        days.push('FRIDAY');
                        break;
                }
            }

            if (days) {
                data.recurrenceRule.days = days;
            }
        }

        const location = locations?.find((_location) => _location.id === locationId);
        const partner = partners?.find((_partner) => _partner.id === selectedPartnerId);
        if (location && partner) {
            props.addEvent(data, location.name, partner.name);
        }
    };

    return (
        <VerticalEventTemplate title="Opprett ny avtale" showEditSymbol={false} isEditing={false}>
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
                    recurrenceEnabled={true}
                />
            </Options>
            <Submitbutton onClick={onSubmit}>Fullfør</Submitbutton>
        </VerticalEventTemplate>
    );
};
