import * as React from 'react';
import styled from 'styled-components';
import { WeightHanging } from '@styled-icons/fa-solid/WeightHanging';
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
    weight?: number;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Event option that allows the user to choose a weight for the event.
 */
export const EventOptionWeight: React.FC<EventOptionDateRangeProps> = (props) => (
    <EventOption icon={WeightHanging}>
        {props.isEditing ? (
            <input type="number" name="weight" value={props.weight} onChange={props.onChange} />
        ) : (
            <GrayBox>{props.weight || 'n/a'}</GrayBox>
        )}
    </EventOption>
);
