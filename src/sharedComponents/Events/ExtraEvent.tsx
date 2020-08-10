import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { EventTemplateVertical } from './EventTemplateVertical';
import { EventOptionDateRange } from './EventOptionDateRange';
import { ApiPickUp, apiUrl } from '../../types';
import { Button } from '../Button';
import { PostToAPI } from '../../utils/PostToAPI';
import { useKeycloak } from '@react-keycloak/web';

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
    beforeSubmit?: (key: string, newPickup: ApiPickUp) => void;
    afterSubmit?: (successful: boolean, key: string) => void;
}

/**
 * Component shown when applying for an extra event (ekstra henting)
 * Should only be visible for ambassadors (ombruksstasjon ambasadør).
 */
export const ExtraEvent: React.FC<ExtraEventProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Valid partners fetched from api
    //let { data: partners } = useSWR<ApiPartner[]>(`${apiUrl}/partners/`, fetcher);
    //partners = partners || [];

    // Valid categories fetched from api
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    //let { data: categories } = useSWR<string[]>(`${apiUrl}/categories`, fetcher);
    //categories = categories && categories.length !== 0 ? categories : ['Møbler', 'Bøker', 'Sportsutstyr'];
    // State
    const [dateRange, setDateRange] = useState<[Date, Date]>([props.start, props.end]);
    const [timeRange, setTimeRange] = useState<[Date, Date]>([props.start, props.end]);
    const [recurring, setReccuring] = useState<'None' | 'Daily' | 'Weekly'>('None');
    const [selectedDays, setSelectedDays] = useState([1]);
    //const [selectedPartnerId, setSelectedPartnerId] = useState(-1);
    //const [categoryIndex, setCategoryIndex] = useState(-1);
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
    //const onPartnerChange = (partnerId: number) => {
    //    setSelectedPartnerId(partnerId);
    //};

    // On change function for Category
    //const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //    e.persist();
    //    setCategoryIndex(parseInt(e.currentTarget.value));
    //};

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
            // Data for new extra event
            const data = {
                startDateTime: start,
                endDateTime: end,
                description: description,
                stationId: keycloak.tokenParsed.GroupID,
            };

            // Local state update data
            const newExtraEvent = {
                id: -1,
                startDateTime: start.toISOString(),
                endDateTime: end.toISOString(),
                description: description,
                station: {
                    id: parseInt(keycloak.tokenParsed.GroupID),
                    name: keycloak.tokenParsed.groups[0],
                    openingTime: '09:00:00Z',
                    closingTime: '20:00:00Z',
                },
                chosenPartner: null,
            };

            if (props.beforeSubmit) {
                props.beforeSubmit(`${apiUrl}/pickups/`, newExtraEvent);
            }

            // Post extra event to API
            await PostToAPI(`${apiUrl}/pickups`, data, keycloak.token);
            // Give userfeedback and close modal
            if (props.afterSubmit) {
                props.afterSubmit(true, `${apiUrl}/pickups/`);
            }
        } catch {
            if (props.afterSubmit) {
                props.afterSubmit(false, `${apiUrl}/pickups/`);
            }
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
            <Specifier>
                {/*
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
                */}
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