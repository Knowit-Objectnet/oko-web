import * as React from 'react';
import styled from 'styled-components';
import {TimeSlot} from "./TimeSlot";

const Group = styled.div`
    border-bottom: 1px solid #ddd;
    min-height: 40px;
    display: flex;
    flex-flow: column nowrap;
`;

export const TimeSlotGroup: React.FC = () => (
    <Group>
        <TimeSlot />
        <TimeSlot />
    </Group>
);
