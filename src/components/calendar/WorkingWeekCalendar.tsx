import * as React from 'react';
import styled from 'styled-components';
import { EventInfo } from '../../services/deprecated/types';
import { Gutter } from './Gutter';
import { TimeSlotColumn } from './TimeSlotColumn';
import { WorkingWeekCalendarTitle } from './WorkingWeekCalendarTitle';
import add from 'date-fns/add';
import isSameDay from 'date-fns/isSameDay';

const Wrapper = styled.div`
    overflow: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    height: fit-content;
`;

const Columns = styled.div`
    width: 100%;
    user-select: none;
    display: flex;
    flex-direction: row;
    min-height: 100%;
    height: inherit;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
`;

interface WorkingWeekCalendarProps {
    date: Date;
    events?: Array<EventInfo>;
    min: Date;
    max: Date;
    step?: number;
    onSelectEvent?: (eventInfo: EventInfo) => void;
}

/*
 * Calendar component that displays a working week monday-friday
 * Step size defaults to 15 and selectable defaults to false
 */
export const WorkingWeekCalendar: React.FC<WorkingWeekCalendarProps> = ({ step = 15, events = [], ...props }) => {
    // Function to set a date to the props.date's year, month, date
    const setDate = (date: Date) => {
        return date.setFullYear(props.date.getFullYear(), props.date.getMonth(), props.date.getDate());
    };

    // Set min and max to the prop.date
    setDate(props.min);
    setDate(props.max);

    // If min is bigger or equal to max then throw error
    if (props.min >= props.max) {
        throw new Error('min has to be less than max');
    }

    // Function to get the date of the monday of the week
    function getMonday(d: Date) {
        d = new Date(d);
        const day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    // Get date objects and array of monday-friday of this week
    const date1 = getMonday(props.date);
    const date2 = add(date1, { days: 1 });
    const date3 = add(date1, { days: 2 });
    const date4 = add(date1, { days: 3 });
    const date5 = add(date1, { days: 4 });
    const dates = [date1, date2, date3, date4, date5];

    // Sort the events according to the days above
    const day1Events = events.filter((event) => isSameDay(event.start, date1));
    const day2Events = events.filter((event) => isSameDay(event.start, date2));
    const day3Events = events.filter((event) => isSameDay(event.start, date3));
    const day4Events = events.filter((event) => isSameDay(event.start, date4));
    const day5Events = events.filter((event) => isSameDay(event.start, date5));
    const daysSortedEvents = [day1Events, day2Events, day3Events, day4Events, day5Events];

    return (
        <Wrapper>
            <Content>
                <Gutter start={props.min} step={step} end={props.max} showTitleGroup={true} titleComponentHeight={70} />
                <Columns>
                    {dates.map((date, index) => (
                        <TimeSlotColumn
                            key={date.toString()}
                            date={dates[index]}
                            title={date.toLocaleString('nb-NO', {
                                weekday: 'long',
                                day: 'numeric',
                            })}
                            titleComponent={WorkingWeekCalendarTitle}
                            colNum={index}
                            events={daysSortedEvents[index]}
                            min={props.min}
                            max={props.max}
                            step={step}
                            onSelectEvent={props.onSelectEvent}
                        />
                    ))}
                </Columns>
            </Content>
        </Wrapper>
    );
};
