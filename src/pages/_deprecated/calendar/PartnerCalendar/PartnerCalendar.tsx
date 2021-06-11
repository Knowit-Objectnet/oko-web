import * as React from 'react';
import { EventInfo } from '../../../../services/_deprecated/types';
import { WeekMenu } from '../WeekMenu';
import { WorkingWeekCalendar } from '../../../../components/_deprecated/calendar/WorkingWeekCalendar';
import { ListView } from './ListView';

interface Props {
    date: Date;
    showCalendar: boolean;
    onSelectEvent: (Event: EventInfo) => void;
    onWeekChange: (delta: -1 | 1) => void;
    events: Array<EventInfo>;
}

/*
 * Calendar and Agenda for partners
 */
export const PartnerCalendar: React.FC<Props> = (props) => {
    const date = new Date(props.date);

    // Dates for the calendar view
    const min = new Date(date.setHours(7, 0, 0, 0));
    const max = new Date(date.setHours(20, 0, 0, 0));

    return (
        <>
            {props.showCalendar ? (
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
                <ListView events={props.events} fromDate={date} numberOfDays={5} />
            )}
        </>
    );
};
