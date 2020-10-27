import * as React from 'react';
import styled from 'styled-components';
import { ApiStation, apiUrl, EventInfo, Roles, SlotInfo } from '../../../types';
import { useKeycloak } from '@react-keycloak/web';
import { ExpandableAgenda } from './ExpandableAgenda';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import { WorkingWeekCalendar } from '../../../sharedComponents/Calendar/WorkingWeekCalendar';
import { WeekMenu } from '../WeekMenu';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';

const OverflowWrapper = styled.div`
    overflow: auto;
    flex: 1;
`;

/*
 * IMPORTANT: To remove the all-day slots we've overwritten the css from the calendar.
 * However, this css might change in future versions of the calendar and break the fix,
 * so be sure to check it after the calendar version has been updated!
 */
const CalendarWrapper = styled.div`
    overflow: auto;
    display: flex;
    flex-direction: row;

    & .rbc-allday-cell {
        display: none !important;
    }

    & .rbc-header {
        border-bottom: none;
    }
`;

const AgendaWrapper = styled.div`
    &:not(:last-child) {
        margin-bottom: 20px;
    }
`;

interface WeekCalendarProps {
    date: Date;
    isToggled: boolean;
    newEvent: (start: Date, end: Date) => void;
    onSelectEvent: (Event: EventInfo) => void;
    onSelectSlot: (start: Date, end: Date, isOslo: boolean) => void;
    onWeekChange: (delta: -1 | 1) => void;
    events: Array<EventInfo>;
}

/**
 * Calendar component for REG employees
 */
export const RegCalendar: React.FC<WeekCalendarProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    // min and max times for the calendar
    const date = new Date(props.date);
    const min = new Date(date.setHours(7, 0, 0, 0));
    const max = new Date(date.setHours(20, 0, 0, 0));

    // Get locations for the calendar
    let { data: locations } = useSWR<ApiStation[]>(`${apiUrl}/stations`, fetcher);
    locations = locations && locations.length !== 0 ? locations : [];

    // Function that handles an event click in the calendar. It displays the Event in a modal
    const onSelectEvent = (event: EventInfo) => {
        props.onSelectEvent(event);
    };

    // Function that handles time range selection in the calendar
    const onSelectSlot = (slotInfo: SlotInfo) => {
        props.onSelectSlot(slotInfo.start, slotInfo.end, keycloak.hasRealmRole(Roles.Oslo));
    };

    // Function to order events by the locations from the API
    const getOrderedEvents = (events: Array<EventInfo>) => {
        const orderedEvents = new Map<string, Array<EventInfo>>();
        // Add the locations to the map
        locations?.forEach((location) => {
            orderedEvents.set(location.name, []);
        });

        events.forEach((event) => {
            if (event.resource?.station) {
                if (orderedEvents.has(event.resource.station.name)) {
                    const _events = orderedEvents.get(event.resource.station.name);
                    if (_events) {
                        _events.push(event);
                    }
                }
            }
        });

        return orderedEvents;
    };

    // The five days to display in the agenda
    const day1 = props.date;
    const day2 = addDays(day1, 1);
    const day3 = addDays(day1, 2);
    const day4 = addDays(day1, 3);
    const day5 = addDays(day1, 4);

    // Sorting the events according to the five days above
    const day1Events = getOrderedEvents(props.events.filter((event) => isSameDay(event.start, day1)));
    const day2Events = getOrderedEvents(props.events.filter((event) => isSameDay(event.start, day2)));
    const day3Events = getOrderedEvents(props.events.filter((event) => isSameDay(event.start, day3)));
    const day4Events = getOrderedEvents(props.events.filter((event) => isSameDay(event.start, day4)));
    const day5Events = getOrderedEvents(props.events.filter((event) => isSameDay(event.start, day5)));

    return (
        <>
            {props.isToggled ? (
                <>
                    <WeekMenu date={props.date} changeWeek={props.onWeekChange} />
                    <WorkingWeekCalendar
                        date={props.date}
                        min={min}
                        max={max}
                        events={props.events}
                        onSelectEvent={props.onSelectEvent}
                    />
                </>
            ) : (
                <CalendarWrapper>
                    <OverflowWrapper>
                        <AgendaWrapper>
                            <ExpandableAgenda
                                date={day1}
                                columns={[...day1Events.keys()]}
                                events={[...day1Events.values()]}
                                onSelectSlot={onSelectSlot}
                                onSelectEvent={onSelectEvent}
                            />
                        </AgendaWrapper>
                        <AgendaWrapper>
                            <ExpandableAgenda
                                date={day2}
                                columns={[...day2Events.keys()]}
                                events={[...day2Events.values()]}
                                onSelectSlot={onSelectSlot}
                                onSelectEvent={onSelectEvent}
                            />
                        </AgendaWrapper>
                        <AgendaWrapper>
                            <ExpandableAgenda
                                date={day3}
                                columns={[...day3Events.keys()]}
                                events={[...day3Events.values()]}
                                onSelectSlot={onSelectSlot}
                                onSelectEvent={onSelectEvent}
                            />
                        </AgendaWrapper>
                        <AgendaWrapper>
                            <ExpandableAgenda
                                date={day4}
                                columns={[...day4Events.keys()]}
                                events={[...day4Events.values()]}
                                onSelectSlot={onSelectSlot}
                                onSelectEvent={onSelectEvent}
                            />
                        </AgendaWrapper>
                        <AgendaWrapper>
                            <ExpandableAgenda
                                date={day5}
                                columns={[...day5Events.keys()]}
                                events={[...day5Events.values()]}
                                onSelectSlot={onSelectSlot}
                                onSelectEvent={onSelectEvent}
                            />
                        </AgendaWrapper>
                    </OverflowWrapper>
                </CalendarWrapper>
            )}
        </>
    );
};
