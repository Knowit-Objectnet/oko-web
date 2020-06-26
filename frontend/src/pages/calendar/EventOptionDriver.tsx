import * as React from 'react';
import styled from 'styled-components';
import { Truck } from '@styled-icons/fa-solid/Truck';
import { EventOption } from './EventOption';

const GrayBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 40px;
    background: #f2f2f2;
    border-radius: 5px;
`;

interface EventOptionDateRangeProps {
    driver?: string;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Event option that allows the user to write choose the name of the driver.
 */
export const EventOptionDriver: React.FC<EventOptionDateRangeProps> = (props) => (
    <EventOption icon={Truck}>
        {props.isEditing ? (
            <input type="text" name="driver" value={props.driver} onChange={props.onChange} />
        ) : (
            <GrayBox>{props.driver ? props.driver.charAt(0).toUpperCase() + props.driver.slice(1) : 'n/a'}</GrayBox>
        )}
    </EventOption>
);
