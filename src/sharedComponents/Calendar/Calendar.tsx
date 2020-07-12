import * as React from 'react';
import styled from 'styled-components';
import { EventInfo, SlotInfo } from '../../types';
import { Gutter } from './Gutter';
import { TimeColumn } from './TimeColumn';
import add from 'date-fns/add';
import { useMemo } from 'react';

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
    events?: Array<Array<EventInfo>>;
    min?: Date;
    max?: Date;
    selectable?: boolean;
    step?: number;
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
    date.setHours(16, 0, 0, 0);
    const eventEnd = add(date, { minutes: 20 });
    const eventEnd2 = add(date, { minutes: 30 });
    const eventstart3 = add(date, { minutes: 31 });
    const eventEnd3 = add(date, { minutes: 60 });
    const eventStart4 = add(date, { minutes: 70 });
    const eventEnd4 = add(date, { minutes: 120 });

    events = [
        [
            {
                title: 'Frigo',
                start: date,
                end: eventEnd,
            },
            {
                title: 'Test',
                start: eventEnd,
                end: eventEnd3,
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
            {
                title: 'Test 2',
                start: eventStart4,
                end: eventEnd4,
            },
        ],
    ];

    return (
        <Wrapper>
            <Content>
                <Gutter start={min} step={step} end={max} />
                <Columns>
                    {props.columns.map((column, index) =>
                        useMemo(
                            () => (
                                <TimeColumn
                                    key={column}
                                    title={column}
                                    events={events[index]}
                                    min={min}
                                    max={max}
                                    step={step}
                                    selectable={selectable}
                                    onSelectSlot={props.onSelectSlot}
                                    onSelecting={props.onSelecting}
                                    onSelectEvent={props.onSelectEvent}
                                />
                            ),
                            [events[index]],
                        ),
                    )}
                </Columns>
            </Content>
        </Wrapper>
    );
};
