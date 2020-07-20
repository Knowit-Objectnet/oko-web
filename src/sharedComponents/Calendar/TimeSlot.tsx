import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../types';

const Slot = styled.div`
    flex: 1 0 0;
    border-top: 1px solid #f7f7f7;
    background-color: ${Colors.White};
`;

interface TimeSlotProps {
    id: number;
}

/*
 * Slot component for the calendar.
 * Has a date-id to keep track of which time it is associated with
 */
export const TimeSlot: React.FC<TimeSlotProps> = (props) => <Slot data-id={props.id}></Slot>;
