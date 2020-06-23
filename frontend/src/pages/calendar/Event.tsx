import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { MessageBox } from './MessageBox';
import { EventTitle } from './EventTitle';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventOptionDriver } from './EventOptionDriver';
import { EventSubmission } from './EventSubmission';
import { EventInfo } from '../../types';
import { EventOptionLocation } from './EventOptionLocation';
import { useGetLocations } from '../../hooks/useGetLocations.jsx';
import { EventOptionWeight } from './EventOptionWeight';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 700px;
    margin: 50px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: row;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const Event: React.FC<EventInfo> = (props) => {
    let locations = useGetLocations();
    locations = locations.length === 0 ? ['grønmo', 'haraldrud', 'smedstad'] : locations;
    const [isEditing, setIsEditing] = useState(false);
    const [isRecurring, setIsRecurring] = useState(false);
    const [startDate, setStartDate] = useState(props.start);
    const [endDate, setEndDate] = useState(props.end);
    const [locationIndex, setLocationIndex] = useState(locations.indexOf(props.resource?.location || ''));
    const [driver, setDriver] = useState(props.resource?.driver);
    const [weight, setWeight] = useState(props.resource?.weight);

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
            case 'recurring': {
                setIsRecurring(!isRecurring);
                break;
            }
        }
    };

    const onLocationChange = (index: number) => {
        setLocationIndex(index);
    };

    const onDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setDriver(e.currentTarget.value || undefined);
    };

    const onWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setWeight(parseInt(e.currentTarget.value));
    };

    const onEditClick = () => {
        onEdit();
    };

    const onEdit = () => {
        setIsEditing(true);
    };

    const onCancel = () => {
        setIsEditing(false);
        setStartDate(props.start);
        setEndDate(props.end);
        setLocationIndex(locations.indexOf(props.resource?.location || ''));
        setDriver(props.resource?.driver);
        setWeight(props.resource?.weight);
    };

    const onSubmit = () => {
        //TODO: Submit to server
        setIsEditing(false);
    };

    return (
        <Wrapper>
            <EventTitle title={props.title} isEditing={isEditing} editable={true} onEditClick={onEditClick} />
            <Body>
                <Options>
                    <EventOptionDateRange
                        start={startDate}
                        end={endDate}
                        isRecurring={isRecurring}
                        isEditing={isEditing}
                        onChange={onDateRangeChange}
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
        </Wrapper>
    );
};
