import * as React from 'react';
import styled from 'styled-components';
import { TimeSlot } from './TimeSlot';

const Group = styled.div`
    border-bottom: 1px solid #ddd;
    min-height: 40px;
    display: flex;
    flex-flow: column nowrap;
`;

interface TimeSlotGroupProps {
    id: number;
}

/*
 * Timeslot group component
 */
export const TimeSlotGroup: React.FC<TimeSlotGroupProps> = (props) => (
    <Group>
        <TimeSlot id={props.id - 1} />
        <TimeSlot id={props.id} />
    </Group>
);
