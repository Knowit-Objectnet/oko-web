import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { EventTemplate } from './EventTemplate';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventOptionCategory } from './EventOptionCategory';
import { EventSubmission } from './EventSubmission';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { EventOptionPartner } from './EventOptionPartner';
import { ApiPartner } from '../../../types';

const Textarea = styled.textarea`
    min-height: 54px;
    padding: 5px;
    margin-bottom: 42px;
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
    const { keycloak } = useKeycloak();

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

    // Valid categories fetched from api
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    let { data: categories } = useSWR<string[]>(['/api/categories', keycloak.token], fetcher);
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

    // Function called on cancellation of new extra event
    const onCancel = () => {
        props.onFinished();
    };

    // Function called on submission of new extra event
    const onSubmit = () => {
        //TODO: Submit to server
        props.onFinished();
    };

    return (
        <EventTemplate title={'Utlys ekstrauttak'} showEditSymbol={false} isEditing={false}>
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
            <EventOptionCategory
                selectedCategory={categoryIndex}
                categories={categories}
                isEditing={true}
                onChange={onCategoryChange}
            />
            Eller
            <EventOptionPartner selectedPartner={selectedPartnerId} partners={partners} onChange={onPartnerChange} />
            <Textarea
                placeholder="Legg til beskrivelse av ønskede varer"
                value={description}
                onChange={onDescriptionChange}
            />
            <EventSubmission onCancel={onCancel} onSubmit={onSubmit} submitText="Send søknad" />
        </EventTemplate>
    );
};
