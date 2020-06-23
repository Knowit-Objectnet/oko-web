import * as React from 'react';
import { EventOption } from './EventOption';
import styled from 'styled-components';
import { LocationOn } from '@styled-icons/material/LocationOn';

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

    &:nth-child(2) {
        margin: 0px 15px;
    }

    user-select: none;
`;

interface EventOptionDateRangeProps {
    isEditing: boolean;
    selectedLocation: number;
    locations: Array<string>;
    onChange: (index: number) => void;
}

export const EventOptionLocation: React.FC<EventOptionDateRangeProps> = (props) => {
    const onClick = (e: React.SyntheticEvent) => {
        const index = e.currentTarget.getAttribute('data-index');
        if (index) {
            props.onChange(parseInt(index));
        }
    };
    return (
        <EventOption icon={LocationOn}>
            {props.isEditing ? (
                props.locations.map((location, index) => (
                    <GrayBox
                        key={location}
                        data-index={index}
                        selected={index === props.selectedLocation}
                        onClick={onClick}
                    >
                        {location.toUpperCase()}
                    </GrayBox>
                ))
            ) : (
                <GrayBox>{props.locations[props.selectedLocation].toUpperCase()}</GrayBox>
            )}
        </EventOption>
    );
};
