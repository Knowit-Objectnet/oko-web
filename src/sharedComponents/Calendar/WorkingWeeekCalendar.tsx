import * as React from 'react';
import styled from 'styled-components';
import { EventInfo, SlotInfo } from '../../types';
import { Gutter } from './Gutter';
import { TimeColumn } from './TimeColumn';
import add from 'date-fns/add';
import { useMemo } from 'react';
import isSameDay from 'date-fns/isSameDay';

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

interface WorkingWeekCalendarProps {
    date: Date;
    events?: Array<EventInfo>;
    min: Date;
    max: Date;
    step?: number;
    selectable?: boolean;
    onSelectEvent?: (eventInfo: EventInfo) => void;
}

export const WorkingWeekCalendar: React.FC<WorkingWeekCalendarProps> = ({
    step = 15,
    events = [],
    selectable = false,
    ...props
}) => {
    const setDate = (date: Date) => {
        return date.setFullYear(props.date.getFullYear(), props.date.getMonth(), props.date.getDate());
    };

    setDate(props.min);
    setDate(props.max);

    if (props.min >= props.max) {
        throw new Error('min has to be less than max');
    }

    function getMonday(d: Date) {
        d = new Date(d);
        const day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    const date1 = getMonday(props.date);
    const date2 = add(date1, { days: 1 });
    const date3 = add(date1, { days: 2 });
    const date4 = add(date1, { days: 3 });
    const date5 = add(date1, { days: 4 });
    const dates = [date1, date2, date3, date4, date5];

    const day1Events = events.filter((event) => isSameDay(event.start, date1));
    const day2Events = events.filter((event) => isSameDay(event.start, date2));
    const day3Events = events.filter((event) => isSameDay(event.start, date3));
    const day4Events = events.filter((event) => isSameDay(event.start, date4));
    const day5Events = events.filter((event) => isSameDay(event.start, date5));
    const daysSortedEvents = [day1Events, day2Events, day3Events, day4Events, day5Events];

    return (
        <Wrapper>
            <Content>
                <Gutter start={props.min} step={step} end={props.max} showTitleGroup={true} />
                <Columns>
                    {dates.map((date, index) =>
                        useMemo(
                            () => (
                                <TimeColumn
                                    key={date.toString()}
                                    date={props.date}
                                    title={date.toLocaleString('nb-NO', {
                                        weekday: 'long',
                                        day: 'numeric',
                                    })}
                                    colNum={index}
                                    events={daysSortedEvents[index]}
                                    min={props.min}
                                    max={props.max}
                                    step={step}
                                    selectable={selectable}
                                    onSelectEvent={props.onSelectEvent}
                                />
                            ),
                            [events[index], props.date],
                        ),
                    )}
                </Columns>
            </Content>
        </Wrapper>
    );
};
