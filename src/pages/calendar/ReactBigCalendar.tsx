import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { nb } from 'date-fns/locale';
import { format, getDay, parse, set, startOfWeek } from 'date-fns';
import { CalendarView, useCalendar } from './CalendarProvider';
import { CalendarToolbar } from './CalendarToolbar';
import { useCalendarEvents } from './hooks/useCalendarEvents';

// TODO: write our own CSS for the calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MIN_DISPLAY_HOUR = set(new Date(), { hours: 6, minutes: 0 });

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
            views={{ month: true, work_week: true, agenda: true, day: true }} // TODO: add custom view component here
            view={state.selectedView}
            onView={handleViewChange}
            dayLayoutAlgorithm="no-overlap"
            components={{
                toolbar: CalendarToolbar,
            }}
            min={MIN_DISPLAY_HOUR}
        />
    );
};
