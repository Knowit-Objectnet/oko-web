import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { EventTemplateVertical } from './EventTemplateVertical';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventOptionCategory } from './EventOptionCategory';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { EventOptionPartner } from './EventOptionPartner';
import { ApiPartner, apiUrl, Colors } from '../../../types';
import { Button } from '../../../sharedComponents/Button';

const Specifier = styled.div`
    margin: 20px 0px;
`;

const OR = styled.div`
    margin-bottom: 10px;
`;

const Textarea = styled.textarea`
    min-height: 54px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    resize: vertical;
`;

interface ExtraEventProps {
    start: Date;
    end: Date;
    onFinished: () => void;
}

/**
 * Component shown when applying for an extra event (ekstra henting)
 * Should only be visible for ambassadors (ombruksstasjon ambasadør).
 */
export const ExtraEvent: React.FC<ExtraEventProps> = (props) => {
    // Valid partners fetched from api
    let { data: partners } = useSWR<ApiPartner[]>(`${apiUrl}/partners/`, fetcher);
    partners = partners || [];

    // Valid categories fetched from api
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    let { data: categories } = useSWR<string[]>(`${apiUrl}/categories`, fetcher);
    categories = categories && categories.length !== 0 ? categories : ['Møbler', 'Bøker', 'Sportsutstyr'];
    // State
    const [dateRange, setDateRange] = useState<[Date, Date]>([props.start, props.end]);
    const [timeRange, setTimeRange] = useState<[Date, Date]>([props.start, props.end]);
    const [recurring, setReccuring] = useState<'None' | 'Daily' | 'Weekly'>('None');
    const [selectedDays, setSelectedDays] = useState([1]);
    const [selectedPartnerId, setSelectedPartnerId] = useState(-1);
    const [categoryIndex, setCategoryIndex] = useState(-1);
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

    // On change for Partner selection
    const onPartnerChange = (partnerId: number) => {
        setSelectedPartnerId(partnerId);
    };

    // On change function for Category
    const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();
        setCategoryIndex(parseInt(e.currentTarget.value));
    };

    // On change function for Description
    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.persist();
        setDescription(e.currentTarget.value);
    };

    // Function called on submission of new extra event
    const onSubmit = () => {
        //TODO: Submit to server
        props.onFinished();
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
            <Specifier>
                <EventOptionCategory
                    selectedCategory={categoryIndex}
                    categories={categories}
                    isEditing={true}
                    onChange={onCategoryChange}
                />
                <OR>Eller</OR>
                <EventOptionPartner
                    selectedPartner={selectedPartnerId}
                    partners={partners}
                    onChange={onPartnerChange}
                />
            </Specifier>
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
