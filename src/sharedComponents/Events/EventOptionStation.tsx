import * as React from 'react';
import { EventOption } from './EventOption';
import styled from 'styled-components';
import { useStations } from '../../services/useStations';

const Select = styled.select`
    width: 100%;
    height: 30px;
`;

interface GrayBoxProps {
    selected?: boolean;
}

const Box = styled.div<GrayBoxProps>`
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 0 40px;
    height: 45px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface EventOptionDateRangeProps {
    isEditing: boolean;
    selectedStation: number;
    onChange: (locationId: number) => void;
}

/**
 * Event option that allows the user choose a location for the event.
 */
export const EventOptionStation: React.FC<EventOptionDateRangeProps> = (props) => {
    const { data: stations } = useStations();

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
                <Select value={props.selectedStation} onChange={onChange}>
                    <option value={-1} disabled>
                        Velg stasjon
                    </option>
                    {stations?.map((location) => (
                        <option value={location.id} key={location.id}>
                            {location.name}
                        </option>
                    ))}
                </Select>
            ) : (
                <Box>{stations?.find((station) => station.id == props.selectedStation)?.name}</Box>
            )}
        </EventOption>
    );
};
