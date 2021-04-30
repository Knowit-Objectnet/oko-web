import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { nb } from 'date-fns/locale';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { CalendarView, useCalendar } from './CalendarProvider';
import { useEvents } from '../../services/hooks/useEvents';

// TODO: write our own CSS for the calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const ReactBigCalendar: React.FC = () => {
    const { state, dispatch } = useCalendar();

    // TODO: extract event-fetching/filtering-logic into hook
    // TODO: wrap in Lazy Result?
    // TODO: prefetch pre- and post-events based on view
    const { data: events } = useEvents({
        fromDate: state.viewDateRange.start.toISOString(),
        toDate: state.viewDateRange.end.toISOString(),
    });
    let filteredEvents = events ?? [];
    if (state.filters.stasjonId !== undefined) {
        filteredEvents = filteredEvents.filter((event) => event.station.id === state.filters.stasjonId);
    }
    const filteredAndTransformedEvents = filteredEvents.map((event) => ({
        start: new Date(event.startDateTime),
        end: new Date(event.endDateTime),
        title: `${event.partner.name} - ${event.station.name}`,
    }));

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
            events={filteredAndTransformedEvents}
            date={state.selectedDate}
            onNavigate={handleDateChange}
            onView={handleViewChange}
            view={state.selectedView}
            dayLayoutAlgorithm="no-overlap"
        />
    );
};
