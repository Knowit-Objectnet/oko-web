import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { nb } from 'date-fns/locale';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { CalendarView, useCalendar } from './CalendarProvider';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEvents } from '../../services/hooks/useEvents';

export const ReactBigCalendar: React.FC = () => {
    const { state, dispatch } = useCalendar();

    // TODO: wrap in Lazy Result?
    // TODO: prefetch pre- and post-events based on view
    const { data: events } = useEvents({
        fromDate: state.viewDateRange.start.toISOString(),
        toDate: state.viewDateRange.end.toISOString(),
        stationId: state.filters.stasjonId, // TODO: separate this out from query (removes unnecessary refetches)
    });

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
            events={(events ?? []).map((event) => ({
                start: new Date(event.startDateTime),
                end: new Date(event.endDateTime),
                title: `${event.partner.name} - ${event.station.name}`,
            }))}
            date={state.selectedDate}
            onNavigate={handleDateChange}
            onView={handleViewChange}
            view={state.selectedView}
            dayLayoutAlgorithm="no-overlap"
        />
    );
};
