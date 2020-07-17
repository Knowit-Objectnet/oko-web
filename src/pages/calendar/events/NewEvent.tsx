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
import { ApiLocation, ApiPartner, apiUrl } from '../../../types';
import { PostToAPI } from '../../../utils/PostToAPI';

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

        // Add 2 hours to dates as we don't support timezones. Hopefully this code doesnt go outside of Norway
        //const startTime = add(timeRange[0], { hours: 2 });
        //const endTime = add(timeRange[1], { hours: 2 });
        //const until = add(dateRange[1], { hours: 2 });
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
            startDateTime: timeRange[0].toISOString().slice(0, -2),
            endDateTime: timeRange[1].toISOString().slice(0, -2),
            station: {
                id: locationId,
            },
            partner: {
                id: selectedPartnerId,
            },
        };

        if (recurring === 'Daily') {
            data.recurrenceRule = {
                until: dateRange[1].toISOString().slice(0, -2),
                days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
            };
        } else if (recurring === 'Weekly') {
            data.recurrenceRule = {
                until: dateRange[1].toISOString().slice(0, -2),
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

        try {
            const res = await PostToAPI(apiUrl + '/calendar/events', data, keycloak.token);
        } catch (err) {
            console.log(err);
        }

        props.onFinished();
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
            <EventSubmission onSubmit={onSubmit} onCancel={onCancel} />
        </VerticalEventTemplate>
    );
};
