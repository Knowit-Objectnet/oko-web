import * as React from 'react';
import { EventOption } from './EventOption';
import styled from 'styled-components';
import { ApiStation } from '../../types';
import LocationIcon from '../../assets/Location.svg';

const Select = styled.select`
    width: 100%;
    height: 30px;
`;

interface GrayBoxProps {
    selected?: boolean;
}

const Box = styled.div<GrayBoxProps>`
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 0px 40px;
    height: 45px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Icon = styled.div`
    margin-right: 15px;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    &:not(:last-child) {
        margin-bottom: 15px;
    }
`;

interface EventOptionDateRangeProps {
    isEditing: boolean;
    selectedLocation: number;
    locations: ApiStation[];
    onChange?: (locationId: number) => void;
}

/**
 * Event option that allows the user choose a location for the event.
 */
export const EventOptionLocation: React.FC<EventOptionDateRangeProps> = (props) => {
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();
        const id = e.currentTarget.value;
        if (props.onChange && id) {
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
                <Row>
                    <Icon>
                        <LocationIcon height="2em" />
                    </Icon>
                    <Box>{props.locations.find((location) => location.id == props.selectedLocation)?.name}</Box>
                </Row>
            )}
        </EventOption>
    );
};
