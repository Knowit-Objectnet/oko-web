import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { EventTemplateVertical } from './EventTemplateVertical';
import { EventOptionDateRange } from './EventOptionDateRange';
import { apiUrl } from '../../types';
import { Button } from '../Button';
import { PostToAPI } from '../../utils/PostToAPI';
import { useKeycloak } from '@react-keycloak/web';
import { types, useAlert } from 'react-alert';

const Textarea = styled.textarea`
    min-height: 54px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    resize: vertical;
`;

interface Props {
    start: Date;
    end: Date;
    afterSubmit?: (successful: boolean) => void;
}

/**
 * Component shown when applying for an extra event (ekstra henting)
 * Should only be visible for ambassadors (ombruksstasjon ambasadør).
 */
export const ExtraEvent: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const [dateRange, setDateRange] = useState<[Date, Date]>([props.start, props.end]);
    const [timeRange, setTimeRange] = useState<[Date, Date]>([props.start, props.end]);
    const [recurring, setReccuring] = useState<'None' | 'Daily' | 'Weekly'>('None');
    const [selectedDays, setSelectedDays] = useState([1]);
    const [description, setDescription] = useState('');

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

    // On change function for Description
    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.persist();
        setDescription(e.currentTarget.value);
    };

    // Function called on submission of new extra event
    const onSubmit = async () => {
        const start = dateRange[0];
        const end = dateRange[1];
        start.setHours(timeRange[0].getHours(), timeRange[0].getMinutes(), 0, 0);
        end.setHours(timeRange[1].getHours(), timeRange[1].getMinutes(), 0, 0);

        try {
            // TODO: Type ApiPickUpPatch
            const newPickUp = {
                startDateTime: start.toISOString(),
                endDateTime: end.toISOString(),
                description: description,
                stationId: keycloak.tokenParsed.GroupID,
            };
            await PostToAPI(`${apiUrl}/pickups`, newPickUp, keycloak.token);
            alert.show('Et nytt ekstrauttak ble lagt til suksessfullt.', { type: types.SUCCESS });
            props.afterSubmit?.(true);
        } catch {
            alert.show('Noe gikk galt, ekstrauttaket ble ikke lagt til.', { type: types.ERROR });
            props.afterSubmit?.(false);
        }
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
            <Button onClick={onSubmit} text="Send" color="Green" height={35} width={350} styling="margin-top: 40px;" />
        </EventTemplateVertical>
    );
};
