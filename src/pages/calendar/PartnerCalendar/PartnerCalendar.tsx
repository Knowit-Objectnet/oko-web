import * as React from 'react';
import { EventInfo } from '../../../types';
import { WeekMenu } from '../WeekMenu';
import { WorkingWeekCalendar } from '../../../sharedComponents/Calendar/WorkingWeekCalendar';
import { ListView } from './ListView';
import { Colors } from '../../../theme';

interface PartnerCalendarProps {
    date: Date;
    showCalendar: boolean;
    onSelectEvent: (Event: EventInfo) => void;
    onWeekChange: (delta: -1 | 1) => void;
    events: Array<EventInfo>;
}

/*
 * Calendar and Agenda for partners
 */
export const PartnerCalendar: React.FC<PartnerCalendarProps> = (props) => {
    const date = new Date(props.date);

    // Dates for the calendar view
    const min = new Date(date.setHours(7, 0, 0, 0));
    const max = new Date(date.setHours(20, 0, 0, 0));

    // Grouping for the agenda view
    const groupByStationFn = (event: EventInfo): string => event.resource.location.name;

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
                <ListView
                    events={props.events}
                    fromDate={date}
                    groupingFn={groupByStationFn}
                    numberOfDays={5}
                />
            )}
        </>
    );
};
