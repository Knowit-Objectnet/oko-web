import * as React from 'react';
import styled from 'styled-components';
import { TimeSlotGroup } from './TimeSlotGroup';

const Column = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100%;

    border-right: 1px solid #ddd;

    &:last-child {
        border-right: none;
    }
`;

interface TimeColumnProps {
    numberOfSlots: number;
}

export const TimeColumn: React.FC<TimeColumnProps> = (props) => {
    const groups = [];

    for (let i = 0; i < Math.ceil(props.numberOfSlots / 2); i++) {
        groups.push(<TimeSlotGroup />);
    }

    return <Column>{groups}</Column>;
};
