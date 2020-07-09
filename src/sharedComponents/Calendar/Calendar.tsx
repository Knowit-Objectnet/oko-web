import * as React from 'react';
import styled from 'styled-components';
import {EventInfo, SlotInfo} from '../../types';
import { Gutter } from './Gutter';
import { TimeColumn } from './TimeColumn';

const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    min-height: 0;
`;

const Columns = styled.div`
    width: 100%;
    user-select: none;
    display: flex;
    flex-direction: row;
    min-height: 100%;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
`;

interface CalendarProps {
    columns: Array<string>;
    min?: Date;
    max?: Date;
    selectable?: boolean;
    step?: number;
    events?: Array<EventInfo>;
    onSelectEvent?: () => void;
    onSelectSlot?: (slotInfo: SlotInfo) => void;
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

    return (
        <Wrapper>
            <Content>
                <Gutter start={min} step={step} end={max} />
                <Columns>
                    {props.columns.map((column) => (
                        <TimeColumn
                            key={column}
                            title={column}
                            min={min}
                            max={max}
                            step={step}
                            selectable={selectable}
                            onSelectSlot={props.onSelectSlot}
                        />
                    ))}
                </Columns>
            </Content>
        </Wrapper>
    );
};
