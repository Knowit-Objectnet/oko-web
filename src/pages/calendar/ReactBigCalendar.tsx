import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { nb } from 'date-fns/locale';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { CalendarView, useCalendar } from './CalendarProvider';
import { Toolbar } from './Toolbar';
import { useCalendarEvents } from './useCalendarEvents';

// TODO: write our own CSS for the calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const ReactBigCalendar: React.FC = () => {
    const { state, dispatch } = useCalendar();

    // TODO: get loading-status for displaying in calendar
    const events = useCalendarEvents();

    const handleDateChange = (date: Date) => {
        dispatch({ type: 'SET_DATE', date });
    };

    const handleViewChange = (view: CalendarView) => {
        dispatch({ type: 'SET_VIEW', view });
    };

    const bigCalendarLocalizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales: { 'nb-no': nb },
    });

    return (
        <Calendar
            localizer={bigCalendarLocalizer}
            culture="nb-no"
            events={events}
            date={state.selectedDate}
            onNavigate={handleDateChange}
            onView={handleViewChange}
            view={state.selectedView}
            dayLayoutAlgorithm="no-overlap"
            components={{
                toolbar: Toolbar,
            }}
        />
    );
};
