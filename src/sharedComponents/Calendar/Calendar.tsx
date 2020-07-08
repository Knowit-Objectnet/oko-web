import * as React from 'react';
import styled from 'styled-components';
import { EventInfo } from '../../types';
import { TimeGutter } from './TimeGutter';
import { TimeColumn } from './TimeColumn';

const Wrapper = styled.div`
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    border: 1px solid #ddd;
    min-height: 0;
`;

interface CalendarProps {
    columns: Array<string>;
    min?: Date;
    max?: Date;
    selectable?: boolean;
    step?: number;
    events?: Array<EventInfo>;
    onSelectEvent?: () => void;
    onSelectSlot?: () => void;
    onSelecting?: () => void;
}

const date = new Date();

export const Calendar: React.FC<CalendarProps> = ({
    selectable = false,
    step = 15,
    events = [],
    min = new Date(date.setHours(0, 0, 0, 0)),
    max = new Date(date.setHours(24, 0, 0, 0)),
    ...props
}) => {
    if (min >= max) {
        throw new Error('min has to be less than max');
    }

    const numberOfSlots = (max.getTime() - min.getTime()) / 60000 / step;

    return (
        <Wrapper>
            <Content>
                {props.columns.map((column) => (
                    <TimeColumn key={column} numberOfSlots={numberOfSlots} />
                ))}
            </Content>
        </Wrapper>
    );
};
