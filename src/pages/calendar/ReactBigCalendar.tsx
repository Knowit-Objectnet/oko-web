import React from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { nb } from 'date-fns/locale';
import { format, getDay, parse, set, startOfWeek } from 'date-fns';
import { CalendarToolbar } from './CalendarToolbar';
import { useCalendarEvents } from './hooks/useCalendarEvents';
import { calendarConfig } from './CalendarConfig';

// TODO: write our own CSS for the calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface Props {
    selectedDate: Date;
    selectedView: View;
    selectedStationId?: number;
    onDateChange: (date: Date) => void;
    onViewChange: (view: View) => void;
}

export const ReactBigCalendar: React.FC<Props> = ({
    selectedDate,
    selectedView,
    onDateChange,
    onViewChange,
    selectedStationId,
}) => {
    // TODO: get loading-status for displaying in calendar
    const events = useCalendarEvents(selectedDate, selectedView, selectedStationId);

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
            date={selectedDate}
            views={calendarConfig.visibleViews}
            view={selectedView}
            onNavigate={onDateChange}
            onView={onViewChange}
            dayLayoutAlgorithm="no-overlap"
            components={{
                toolbar: CalendarToolbar,
            }}
            min={set(new Date(), { hours: calendarConfig.minDisplayHour, minutes: 0 })}
        />
    );
};
