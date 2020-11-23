import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventTemplateVertical } from './EventTemplateVertical';
import { useKeycloak } from '@react-keycloak/web';
import { types, useAlert } from 'react-alert';
import { queryCache, useMutation } from 'react-query';
import { ApiEventPost, eventsDefaultQueryKey, postEvent } from '../../api/EventService';
import { WorkingWeekdays } from '../../types';
import { StationSelect } from '../forms/StationSelect';
import { PartnerSelect } from '../forms/PartnerSelect';
import { PositiveButton } from '../buttons/Buttons';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 350px;
`;

const SubmitButton = styled(PositiveButton)`
    margin-top: 20px;
`;

interface Props {
    start: Date;
    end: Date;
    afterSubmit?: (successful: boolean) => void;
}

const WEEKDAYS: Array<WorkingWeekdays> = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

export const NewEvent: React.FC<Props> = (props) => {
    const alert = useAlert();
    const { keycloak } = useKeycloak();

    const [addEventMutation, { isLoading: addEventLoading }] = useMutation(
        (newEvent: ApiEventPost) => postEvent(newEvent, keycloak.token),
        {
            onSuccess: () => {
                alert.show('Avtalen ble lagt til.', { type: types.SUCCESS });
                props.afterSubmit?.(true);
            },
            onError: () => {
                alert.show('Noe gikk kalt, avtalen ble ikke lagt til.', { type: types.ERROR });
                props.afterSubmit?.(false);
            },
            onSettled: () => queryCache.invalidateQueries(eventsDefaultQueryKey),
        },
    );

    const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(props.start), new Date(props.end)]);
    const [timeRange, setTimeRange] = useState<[Date, Date]>([new Date(props.start), new Date(props.end)]);
    const [recurring, setReccuring] = useState<'None' | 'Daily' | 'Weekly'>('None');
    const [selectedDays, setSelectedDays] = useState([1]);
    const [selectedPartnerId, setSelectedPartnerId] = useState<number>();
    const [selectedStationId, setSelectedStationId] = useState<number>();

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

    const handleEditEventSubmission = (submitEvent: React.FormEvent) => {
        submitEvent.preventDefault();

        // Remove all alerts to not multiple alerts from earlier tries.
        // The ts-ignore is needed as for some reason the @types for the library forgot to add removeAll to the interface
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        alert.removeAll();

        // Cancel submission if token doesn't exist as they are not logged in
        if (!keycloak?.token) {
            alert.show('Noe er galt med brukeren din, logg inn på nytt og prøv igjen.', { type: types.ERROR });
            return;
        }

        // Cancel submission if no partner is selected
        if (!selectedPartnerId) {
            alert.show('Du må velge en samarbeidspartner for avtalen.', { type: types.ERROR });
            return;
        }

        // Cancel submission if no station is selected
        if (!selectedStationId) {
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

        const newEvent: ApiEventPost = {
            startDateTime: timeRange[0].toISOString(),
            endDateTime: timeRange[1].toISOString(),
            stationId: selectedStationId,
            partnerId: selectedPartnerId,
        };

        if (recurring === 'Daily') {
            newEvent.recurrenceRule = {
                until: dateRange[1].toISOString(),
                days: WEEKDAYS,
            };
        } else if (recurring === 'Weekly') {
            newEvent.recurrenceRule = {
                until: dateRange[1].toISOString(),
                days: selectedDays.map((index) => WEEKDAYS[index - 1]),
            };
        }

        addEventMutation(newEvent);
    };

    return (
        <EventTemplateVertical title="Opprett ny avtale" showEditSymbol={false} isEditing={false}>
            <StyledForm onSubmit={handleEditEventSubmission}>
                <PartnerSelect onSelectedPartnerChange={setSelectedPartnerId} selectedPartnerId={selectedPartnerId} />
                <StationSelect onSelectedStationChange={setSelectedStationId} selectedStationId={selectedStationId} />
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
                <SubmitButton isLoading={addEventLoading}>Lagre</SubmitButton>
            </StyledForm>
        </EventTemplateVertical>
    );
};
