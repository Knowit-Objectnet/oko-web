import * as React from 'react';
import { EventInfo } from '../../../../services/deprecated/types';
import { WeekMenu } from '../WeekMenu';
import { WorkingWeekCalendar } from '../../../../components/calendar/WorkingWeekCalendar';

interface AmbassadorCalendarProps {
    date: Date;
    isToggled: boolean;
    onSelectEvent: (Event: EventInfo) => void;
    onWeekChange: (delta: -1 | 1) => void;
    events: Array<EventInfo>;
}

/*
 * Calendar and Agenda for station ambassadors
 */
export const StationCalendar: React.FC<AmbassadorCalendarProps> = (props) => {
    // min and max times for the agenda and calendar
    const date = new Date(props.date);
    const min = new Date(date.setHours(7, 0, 0, 0));
    const max = new Date(date.setHours(20, 0, 0, 0));

    return (
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
    );
};
