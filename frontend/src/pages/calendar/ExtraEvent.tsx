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
    // Valid recycling stations (ombruksstasjon) locations fetched from api
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    let locations = useGetLocations();
    locations = locations.length === 0 ? ['grønmo', 'haraldrud', 'smestad'] : locations;
    // Valid categories fetched from api
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    let categories = useGetCategories();
    categories = categories.length === 0 ? ['Møbler', 'Bøker', 'Sportsutstyr'] : categories;
    // State
    const [startDate, setStartDate] = useState(props.start);
    const [endDate, setEndDate] = useState(props.end);
    const [locationIndex, setLocationIndex] = useState(0);
    const [categoryIndex, setCategoryIndex] = useState(-1);
    const [description, setDescription] = useState('');

    // On change function for DateRange
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

    // On change function for Location
    const onLocationChange = (index: number) => {
        setLocationIndex(index);
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
