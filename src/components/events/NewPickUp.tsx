import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { EventTemplateVertical } from './EventTemplateVertical';
import { EventOptionDateRange } from './EventOptionDateRange';
import { useKeycloak } from '@react-keycloak/web';
import { types, useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';
import { ApiPickUpPost, pickUpsDefaultQueryKey, postPickUp } from '../../services/PickUpService';
import { PositiveButton } from '../buttons/PositiveButton';
import { AuthTokenParsed } from '../../auth/useAuth';

const Textarea = styled.textarea`
    min-height: 5rem;
    width: 25rem;
    padding: 0.5rem;
    resize: vertical;
    margin: 1rem 0;
`;

interface Props {
    start: Date;
    end: Date;
    afterSubmit?: (successful: boolean) => void;
}

export const NewPickUp: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const queryClient = useQueryClient();
    const addPickUpMutation = useMutation((newPickUp: ApiPickUpPost) => postPickUp(newPickUp, keycloak.token), {
        onSuccess: () => {
            alert.show('Et nytt ekstrauttak ble lagt til.', { type: types.SUCCESS });
            props.afterSubmit?.(true);
        },
        onError: () => {
            alert.show('Noe gikk galt, ekstrauttaket ble ikke lagt til.', { type: types.ERROR });
            props.afterSubmit?.(false);
        },
        onSettled: () => {
            queryClient.invalidateQueries(pickUpsDefaultQueryKey);
        },
    });

    const [dateRange, setDateRange] = useState<[Date, Date]>([props.start, props.end]);
    const [timeRange, setTimeRange] = useState<[Date, Date]>([props.start, props.end]);
    const [recurring, setReccuring] = useState<'None' | 'Daily' | 'Weekly'>('None');
    const [selectedDays, setSelectedDays] = useState([1]);
    const [description, setDescription] = useState('');

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

    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.persist();
        setDescription(e.currentTarget.value);
    };

    const handleNewPickUpSubmission = () => {
        const start = dateRange[0];
        const end = dateRange[1];
        start.setHours(timeRange[0].getHours(), timeRange[0].getMinutes(), 0, 0);
        end.setHours(timeRange[1].getHours(), timeRange[1].getMinutes(), 0, 0);

        const newPickUp: ApiPickUpPost = {
            startDateTime: start.toISOString(),
            endDateTime: end.toISOString(),
            description: description,
            stationId: (keycloak.tokenParsed as AuthTokenParsed).GroupID as number,
        };

        addPickUpMutation.mutate(newPickUp);
    };

    return (
        <EventTemplateVertical title={'Utlys ekstrauttak'} showEditSymbol={false} isEditing={false}>
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
                recurrenceEnabled={false}
            />
            <Textarea
                maxLength={200}
                placeholder="Meldingstekst (maks 200 tegn)"
                value={description}
                onChange={onDescriptionChange}
            />
            <PositiveButton onClick={handleNewPickUpSubmission} isLoading={addPickUpMutation.isLoading}>
                Send
            </PositiveButton>
        </EventTemplateVertical>
    );
};
