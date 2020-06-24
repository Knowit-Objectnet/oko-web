import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { EventTemplate } from './EventTemplate';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventOptionLocation } from './EventOptionLocation';
import { EventOptionCategory } from './EventOptionCategory';
import { useGetLocations } from '../../hooks/useGetLocations.jsx';
import { EventSubmission } from './EventSubmission';
import { useGetCategories } from '../../hooks/useGetCategories';

const Textarea = styled.textarea`
    min-height: 54px;
    padding: 5px;
    margin-bottom: 42px;
    resize: vertical;
`;

interface newEventProps {
    start: Date;
    end: Date;
    onFinished: () => void;
}

export const ExtraEvent: React.FC<newEventProps> = (props) => {
    let locations = useGetLocations();
    locations = locations.length === 0 ? ['grønmo', 'haraldrud', 'smedstad'] : locations;
    let categories = useGetCategories();
    categories = categories.length === 0 ? ['Møbler', 'Bøker', 'Sportsutstyr'] : categories;

    const [startDate, setStartDate] = useState(props.start);
    const [endDate, setEndDate] = useState(props.end);
    const [locationIndex, setLocationIndex] = useState(0);
    const [categoryIndex, setCategoryIndex] = useState(-1);
    const [description, setDescription] = useState('');

    const onDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        switch (e.currentTarget.name) {
            case 'startDate': {
                setStartDate(new Date(e.currentTarget.value));
                break;
            }
            case 'endDate': {
                setEndDate(new Date(e.currentTarget.value));
                break;
            }
        }
    };

    const onLocationChange = (index: number) => {
        setLocationIndex(index);
    };

    const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();
        setCategoryIndex(parseInt(e.currentTarget.value));
    };

    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.persist();
        setDescription(e.currentTarget.value);
    };

    const onCancel = () => {
        props.onFinished();
    };

    const onSubmit = () => {
        //TODO: Submit to server
        props.onFinished();
    };

    return (
        <EventTemplate title={'Søk om ekstrahenting'} showEditSymbol={false} isEditing={false}>
            <EventOptionDateRange
                start={startDate}
                end={endDate}
                isRecurringEnabled={false}
                isEditing={true}
                onChange={onDateRangeChange}
            />
            <EventOptionLocation
                isEditing={true}
                selectedLocation={locationIndex}
                locations={locations}
                onChange={onLocationChange}
            />
            <EventOptionCategory
                selectedCategory={categoryIndex}
                categories={categories}
                isEditing={true}
                onChange={onCategoryChange}
            />
            <Textarea
                placeholder="Legg til beskrivelse av ønskede varer"
                value={description}
                onChange={onDescriptionChange}
            />
            <EventSubmission onCancel={onCancel} onSubmit={onSubmit} submitText="Send søknad" />
        </EventTemplate>
    );
};
