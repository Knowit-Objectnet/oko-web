import * as React from 'react';
import { EventOption } from './EventOption';
import styled from 'styled-components';
import { LocationOn } from '@styled-icons/material/LocationOn';
import { ApiLocation } from '../../types';

interface GrayBoxProps {
    selected?: boolean;
}

const GrayBox = styled.div<GrayBoxProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 40px;
    background: #f2f2f2;
    border-radius: 5px;
    border: ${(props) => (props.selected ? 'solid 1px black' : null)};
    box-sizing: border-box;

    &:nth-child(2) {
        margin: 0px 15px;
    }

    user-select: none;
`;

interface EventOptionDateRangeProps {
    isEditing: boolean;
    selectedLocation: number;
    locations: ApiLocation[];
    onChange: (locationId: number) => void;
}

/**
 * Event option that allows the user choose a location for the event.
 */
export const EventOptionLocation: React.FC<EventOptionDateRangeProps> = (props) => {
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();
        const id = e.currentTarget.value;
        if (id) {
            props.onChange(parseInt(id));
        }
    };

    return (
        <EventOption icon={LocationOn}>
            {props.isEditing ? (
                <select value={props.selectedLocation} onChange={onChange}>
                    <option value={-1} disabled>
                        Velg stasjon
                    </option>
                    {props.locations.map((location) => (
                        <option value={location.id} key={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>
            ) : (
                <GrayBox>{props.locations.find((location) => location.id == props.selectedLocation)?.name}</GrayBox>
            )}
        </EventOption>
    );
};
