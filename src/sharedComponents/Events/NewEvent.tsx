import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventOptionLocation } from './EventOptionLocation';
import { EventTemplateVertical } from './EventTemplateVertical';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { EventOptionPartner } from './EventOptionPartner';
import { ApiLocation, ApiPartner, apiUrl } from '../../types';
import { useAlert, types } from 'react-alert';
import { Button } from '../Button';
import { PostToAPI } from '../../utils/PostToAPI';

const Options = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

interface NewEventProps {
    start: Date;
    end: Date;
    beforeSubmit?: (
        key: string,
        data: {
            startDateTime: string;
            endDateTime: string;
            stationId: number;
            partnerId: number;
            recurrenceRule?: {
                until: string;
                days?: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'>;
                count?: number;
                interval?: number;
            };
        },
        station: ApiLocation,
        partner: ApiPartner,
    ) => void;
    afterSubmit?: (successful: boolean, key: string) => void;
}

/**
 * Component shown when a range is selected in calendar or new event button clciked.
 * Will only be rendered for Oslo Kommune.
 */
export const NewEvent: React.FC<NewEventProps> = (props) => {
    // Alert dispatcher
    const alert = useAlert();
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Valid recycling stations (ombruksstasjon) locations fetched from api
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    let { data: locations } = useSWR<ApiLocation[]>(`${apiUrl}/stations`, fetcher);
    locations = locations && locations.length !== 0 ? locations : [];
    // Valid partners fetched from api
    let { data: partners } = useSWR<ApiPartner[]>(`${apiUrl}/partners`, fetcher);
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

    // Function called on successful event edit.
    const onSubmit = async () => {
        // Remove all alerts to not multiple alerts from earlier tries.
        // The ts-ignore is needed as for some reason the @types for the library forgot to add removeAll to the interface
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        alert.removeAll();
        // Get location and partner
        const location = locations?.find((_location) => _location.id === locationId);
        const partner = partners?.find((_partner) => _partner.id === selectedPartnerId);

        // Cancel submission if token doesn't exist as they are not logged in
        if (!keycloak?.token) {
            alert.show('Noe er galt med brukeren din, logg inn på nytt og prøv igjen.', { type: types.ERROR });
            return;
        }

        // Cancel submission of no location is selected
        if (!partner) {
            alert.show('Du må velge en samarbeidspartner for avtalen.', { type: types.ERROR });
            return;
        }

        // Cancel submission of no location is selected
        if (!location) {
            alert.show('Du må velge en stasjon for avtalen.', { type: types.ERROR });
            return;
        }

        // Cancel submission if start time is bigger than end time
        if (timeRange[0] > timeRange[1]) {
            alert.show('Start tiden kan ikke vøre etter slutt tiden.', { type: types.ERROR });
            return;
        }
        // Cancel submission if the start time is less than the min time
        const min = new Date(timeRange[0]);
        min.setHours(8, 0, 0, 0);
        if (timeRange[0] < min) {
            alert.show('Starttiden kan ikke være før 08:00', { type: types.ERROR });
            return;
        }
        // Cancel submission if the end time is less than the min time
        const max = new Date(timeRange[1]);
        max.setHours(20, 0, 0, 0);
        if (timeRange[1] > max) {
            alert.show('Sluttiden kan ikke være etter 20:00', { type: types.ERROR });
            return;
        }

        // Dates has to be written as strings as we need to remove the Z, as ISO 8601 is not fully supported
        const data: {
            startDateTime: string;
            endDateTime: string;
            stationId: number;
            partnerId: number;
            recurrenceRule?: {
                until: string;
                days?: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'>;
                count?: number;
                interval?: number;
            };
        } = {
            startDateTime: timeRange[0].toISOString(),
            endDateTime: timeRange[1].toISOString(),
            stationId: locationId,
            partnerId: selectedPartnerId,
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

        try {
            if (props.beforeSubmit) {
                props.beforeSubmit(`${apiUrl}/events`, data, location, partner);
            }

            // Post the event to the backend
            await PostToAPI(`${apiUrl}/events`, data, keycloak.token);

            if (props.afterSubmit) {
                props.afterSubmit(true, `${apiUrl}/events`);
            }
        } catch (err) {
            if (props.afterSubmit) {
                props.afterSubmit(false, `${apiUrl}/events`);
            }
        }
    };

    return (
        <EventTemplateVertical title="Opprett ny avtale" showEditSymbol={false} isEditing={false}>
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
            <Button
                onClick={onSubmit}
                text="Fullfør"
                color="Green"
                height={35}
                width={350}
                styling="margin-top: 40px;"
            />
        </EventTemplateVertical>
    );
};
