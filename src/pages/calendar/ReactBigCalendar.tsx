import React from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { nb } from 'date-fns/locale';
import { format, getDay, parse, setHours, startOfWeek } from 'date-fns';
import { CalendarToolbar } from './CalendarToolbar';
import { useCalendarEvents } from './hooks/useCalendarEvents';
import { useCalendarState } from './hooks/useCalendarState';
import { useHistory } from 'react-router-dom';
import { VIEWS } from './hooks/useCalendarView';
import findKey from 'lodash/findkey';

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

    const handleViewChange = (view: View) => {
        const calendarView = findKey(VIEWS, (viewProperties) => viewProperties.viewType === view);
        history.replace(`/kalender/${calendarView}`);
    };

    return (
        <Calendar
            localizer={bigCalendarLocalizer}
            culture="nb-no"
            events={events}
            date={state.selectedDate}
            views={Object.values(VIEWS).map((viewProperties) => viewProperties.viewType)} // TODO: add custom view component here
            view={VIEWS[selectedView].viewType}
            onNavigate={handleDateChange}
            onView={handleViewChange}
            dayLayoutAlgorithm="no-overlap"
            components={{
                toolbar: CalendarToolbar,
            }}
            min={setHours(new Date(), 6)}
        />
    );
};
