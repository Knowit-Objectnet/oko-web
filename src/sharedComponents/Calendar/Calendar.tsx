import * as React from 'react';
import styled from 'styled-components';
import { EventInfo, SlotInfo } from '../../types';
import { Gutter } from './Gutter';
import { TimeColumn } from './TimeColumn';
import add from 'date-fns/add';

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
    onSelectEvent?: (eventInfo: EventInfo) => void;
    onSelectSlot?: (slotInfo: SlotInfo) => void;
    onSelecting?: (range: { start?: Date; end?: Date }) => boolean;
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

    const eventEnd = add(date, { minutes: 20 });
    const eventEnd2 = add(date, { minutes: 30 });
    const eventstart3 = add(date, { minutes: 31 });
    const eventEnd3 = add(date, { minutes: 60 });

    events = [
        {
            title: 'Frigo',
            start: date,
            end: eventEnd,
        },
        {
            title: 'Test',
            start: date,
            end: eventEnd,
        },
        {
            title: 'Fretex',
            start: date,
            end: eventEnd2,
        },
        {
            title: 'Jobben',
            start: eventstart3,
            end: eventEnd3,
        },
    ];

    return (
        <Wrapper>
            <Content>
                <Gutter start={min} step={step} end={max} />
                <Columns>
                    {props.columns.map((column) => (
                        <TimeColumn
                            key={column}
                            title={column}
                            events={events}
                            min={min}
                            max={max}
                            step={step}
                            selectable={selectable}
                            onSelectSlot={props.onSelectSlot}
                            onSelecting={props.onSelecting}
                            onSelectEvent={props.onSelectEvent}
                        />
                    ))}
                </Columns>
            </Content>
        </Wrapper>
    );
};
