import * as React from 'react';
import styled from 'styled-components';
import { EventInfo, SlotInfo } from '../../../../types';
import { ExpandableAgenda } from './ExpandableAgenda';
import isSameDay from 'date-fns/isSameDay';
import { WorkingWeekCalendar } from '../../../../components/calendar/WorkingWeekCalendar';
import { WeekMenu } from '../WeekMenu';
import { createNDaysFromDate } from '../../../../utils/createNDaysFromDate';

const CalendarWrapper = styled.div`
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

const AgendaWrapper = styled.div`
    flex: 1;
    &:not(:last-child) {
        margin-bottom: 20px;
    }
`;

interface Props {
    date: Date;
    events: Array<EventInfo>;
    isToggled: boolean;
    onSelectEvent: (Event: EventInfo) => void;
    onSelectSlot: (start: Date, end: Date) => void;
    onWeekChange: (delta: -1 | 1) => void;
}

/**
 * Calendar component for REG employees
 */
export const AdminCalendar: React.FC<Props> = (props) => {
    // min and max times for the calendar
    const date = new Date(props.date);
    const min = new Date(date.setHours(7, 0, 0, 0));
    const max = new Date(date.setHours(20, 0, 0, 0));

    const daysToShow: Array<Date> = createNDaysFromDate(props.date, 5);

    // Function that handles an event click in the calendar. It displays the Event in a modal
    const handleSelectEvent = (event: EventInfo) => {
        props.onSelectEvent(event);
    };

    // Function that handles time range selection in the calendar
    const handleSelectSlot = (slotInfo: SlotInfo) => {
        props.onSelectSlot(slotInfo.start, slotInfo.end);
    };

    const getAgendaForDate = (date: Date) => {
        const eventsForDate = props.events.filter((event) => isSameDay(event.start, date));
        return (
            <AgendaWrapper key={date.toString()}>
                <ExpandableAgenda
                    date={date}
                    events={eventsForDate}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                />
            </AgendaWrapper>
        );
    };

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
                <CalendarWrapper>{daysToShow.map((date: Date) => getAgendaForDate(date))}</CalendarWrapper>
            )}
        </>
    );
};
