import * as React from 'react';
import { EventOption } from './EventOption';
import styled from 'styled-components';
import { ApiLocation, Colors } from '../../../types';

const Select = styled.select`
    width: 100%;
    height: 30px;
`;

interface GrayBoxProps {
    selected?: boolean;
}

const Box = styled.div<GrayBoxProps>`
    background-color: ${Colors.LightBeige};
    padding: 0px 40px;
    height: 45px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
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
        <EventOption>
            {props.isEditing ? (
                <Select value={props.selectedLocation} onChange={onChange}>
                    <option value={-1} disabled>
                        Velg stasjon
                    </option>
                    {props.locations.map((location) => (
                        <option value={location.id} key={location.id}>
                            {location.name}
                        </option>
                    ))}
                </Select>
            ) : (
                <Box>{props.locations.find((location) => location.id == props.selectedLocation)?.name}</Box>
            )}
        </EventOption>
    );
};
