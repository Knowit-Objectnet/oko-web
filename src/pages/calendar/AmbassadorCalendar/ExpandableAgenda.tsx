import * as React from 'react';
import styled from 'styled-components';
import { WorkingWeekCalendar } from '../../../sharedComponents/Calendar/WorkingWeekCalendar';
import { ListView } from '../SharedCalendarComponents/ListView';
import { EventInfo } from '../../../types';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import { WeekMenu } from '../WeekMenu';

const Wrapper = styled.div``;

interface ExpandableAgendaProps {
    date: Date;
    isToggled: boolean;
    events: Array<EventInfo>;
    onSelectEvent: (event: EventInfo) => void;
    onWeekChange: (delta: -1 | 1) => void;
}

/*
 * Expandable agenda that expans into a week calendar, for station ambassadors
 */
export const ExpandableAgenda: React.FC<ExpandableAgendaProps> = (props) => {
    // min and max times for the agenda and calendar
    const date = new Date(props.date);
    const min = new Date(date.setHours(7, 0, 0, 0));
    const max = new Date(date.setHours(20, 0, 0, 0));

    // The five days to display in the agenda
    const day1 = props.date;
    const day2 = addDays(day1, 1);
    const day3 = addDays(day1, 2);
    const day4 = addDays(day1, 3);
    const day5 = addDays(day1, 4);

    // Sorting the evenst according to the five days above
    const day1Events = props.events.filter((event) => isSameDay(event.start, day1));
    const day2Events = props.events.filter((event) => isSameDay(event.start, day2));
    const day3Events = props.events.filter((event) => isSameDay(event.start, day3));
    const day4Events = props.events.filter((event) => isSameDay(event.start, day4));
    const day5Events = props.events.filter((event) => isSameDay(event.start, day5));

    // Mapping of day to events
    const daysAndSortedEvents: Array<[Date, Array<EventInfo>]> = [
        [day1, day1Events],
        [day2, day2Events],
        [day3, day3Events],
        [day4, day4Events],
        [day5, day5Events],
    ];

    // Sorting function for the listview/agenda
    // It will sort and map events to it's title (partner name)
    const sorting = (events: Array<EventInfo>) => {
        const sortedEvents = new Map<string, Array<EventInfo>>();
        events.forEach((event) => {
            if (sortedEvents.has(event.title)) {
                const _events = sortedEvents.get(event.title);
                if (_events) {
                    _events.push(event);
                }
            } else {
                sortedEvents.set(event.title, [event]);
            }
        });
        return sortedEvents;
    };

    return (
        <Wrapper>
            {props.isToggled ? (
                <>
                    <WeekMenu date={props.date} changeWeek={props.onWeekChange} />
                    <WorkingWeekCalendar
                        date={props.date}
                        onSelectEvent={props.onSelectEvent}
                        events={props.events}
                        min={min}
                        max={max}
                    />
                </>
            ) : (
                <ListView
                    date={props.date}
                    dayAndEvents={daysAndSortedEvents}
                    sorting={sorting}
                    allowDeletionOfEvent={false}
                />
            )}
        </Wrapper>
    );
};