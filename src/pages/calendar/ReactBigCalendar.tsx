import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { nb } from 'date-fns/locale';
import { format, getDay, parse, set, startOfWeek } from 'date-fns';
import { CalendarToolbar } from './CalendarToolbar';
import { useCalendarEvents } from './hooks/useCalendarEvents';
import { calendarConfig, CalendarView } from './CalendarConfig';
import { useCalendarState } from './hooks/useCalendarState';
import { useHistory } from 'react-router-dom';

// TODO: write our own CSS for the calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const ReactBigCalendar: React.FC = () => {
    const { selectedView, state, dispatch } = useCalendarState();
    // TODO: get loading-status for displaying in calendar
    const events = useCalendarEvents();
    const history = useHistory();

    const bigCalendarLocalizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales: { 'nb-no': nb },
    });

    const handleDateChange = (date: Date) => {
        dispatch({ type: 'SET_DATE', date });
    };

    const handleViewChange = (view: CalendarView) => {
        const viewPathKey = calendarConfig.viewProperties[view].pathKey;
        history.replace(`/kalender/${viewPathKey}`);
    };

    return (
        <Calendar
            localizer={bigCalendarLocalizer}
            culture="nb-no"
            events={events}
            date={state.selectedDate}
            views={calendarConfig.visibleViews}
            view={selectedView}
            onNavigate={handleDateChange}
            onView={handleViewChange}
            dayLayoutAlgorithm="no-overlap"
            components={{
                toolbar: CalendarToolbar,
            }}
            min={set(new Date(), { hours: calendarConfig.minDisplayHour, minutes: 0 })}
        />
    );
};
