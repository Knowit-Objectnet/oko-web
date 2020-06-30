import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { MessageBox } from './MessageBox';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventOptionDriver } from './EventOptionDriver';
import { EventSubmission } from './EventSubmission';
import { EventInfo } from '../../types';
import { EventOptionLocation } from './EventOptionLocation';
import { useGetLocations } from '../../hooks/useGetLocations';
import { EventOptionWeight } from './EventOptionWeight';
import { EventTemplate } from './EventTemplate';

const Body = styled.div`
    display: flex;
    flex-direction: row;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

/**
 * Component shown when event in calendar is clicked.
 * Will be rendered differently depending on user's role.
 */
export const Event: React.FC<EventInfo> = (props) => {
    // Valid recycling stations (ombruksstasjon) locations fetched from api
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    let locations = useGetLocations();
    locations = locations.length === 0 ? ['grønmo', 'haraldrud', 'smestad'] : locations;
    // State
    const [isEditing, setIsEditing] = useState(false);
    const [startDate, setStartDate] = useState(props.start);
    const [endDate, setEndDate] = useState(props.end);
    const [locationIndex, setLocationIndex] = useState(locations.indexOf(props.resource?.location || ''));
    const [driver, setDriver] = useState(props.resource?.driver);
    const [weight, setWeight] = useState(props.resource?.weight);

    // On change functions for DateRange
    const onStartDateChange = (date: Date) => {
        setStartDate(date);
    };

    const onEndDateChange = (date: Date) => {
        setEndDate(date);
    };

    // On change function for the Location component
    const onLocationChange = (index: number) => {
        setLocationIndex(index);
    };

    // On change function for the Driver component
    const onDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setDriver(e.currentTarget.value || undefined);
    };

    // On change function for the Weight component
    const onWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setWeight(parseInt(e.currentTarget.value));
    };

    // On change function for the Edit button
    const onEditClick = () => {
        setIsEditing(true);
    };

    // Function called if edit was cancelled. Resets all values to the original event info
    const onCancel = () => {
        setIsEditing(false);
        setStartDate(props.start);
        setEndDate(props.end);
        setLocationIndex(locations.indexOf(props.resource?.location || ''));
        setDriver(props.resource?.driver);
        setWeight(props.resource?.weight);
    };

    // Function called on successful event edit.
    const onSubmit = () => {
        //TODO: Submit to server
        setIsEditing(false);
    };

    return (
        <EventTemplate title={props.title} showEditSymbol={true} isEditing={isEditing} onEditClick={onEditClick}>
            <Body>
                <Options>
                    <EventOptionDateRange
                        start={startDate}
                        end={endDate}
                        isRecurringEnabled={false}
                        isEditing={isEditing}
                        onStartDateChange={onStartDateChange}
                        onEndDateChange={onEndDateChange}
                    />
                    <EventOptionLocation
                        isEditing={isEditing}
                        selectedLocation={locationIndex}
                        locations={locations}
                        onChange={onLocationChange}
                    />
                    <EventOptionDriver driver={driver} isEditing={isEditing} onChange={onDriverChange} />
                    <EventOptionWeight weight={weight} isEditing={isEditing} onChange={onWeightChange} />
                </Options>
                {props.resource && props.resource.message && !isEditing ? (
                    <MessageBox {...props.resource.message} />
                ) : null}
            </Body>
            {isEditing ? <EventSubmission onSubmit={onSubmit} onCancel={onCancel} /> : null}
        </EventTemplate>
    );
};
