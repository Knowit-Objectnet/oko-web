import React from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { nb } from 'date-fns/locale';
import { format, getDay, parse, set, startOfWeek } from 'date-fns';
import { CalendarToolbar } from './CalendarToolbar';
import { useCalendarEvents } from './hooks/useCalendarEvents';
import { getCalendarViewFromType, VIEWS } from './hooks/useCalendarView';
import { useCalendarState } from './CalendarProvider';
import { Box } from '@chakra-ui/layout';

// TODO: write our own CSS for the calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const CalendarComponent: React.FC = () => {
    const { selectedView, setSelectedView, selectedDate, setSelectedDate } = useCalendarState();

    // TODO: get loading-status for displaying in calendar
    const events = useCalendarEvents();

    const bigCalendarLocalizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales: { 'nb-no': nb },
    });

    const handleViewChange = (view: View) => {
        const calendarView = getCalendarViewFromType(view);
        setSelectedView(calendarView);
    };

    return (
        <Box
            sx={{
                'div.rbc-event': {
                    backgroundColor: 'surface',
                    color: 'onSurface',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: 'DarkBeige',
                },
                '.rbc-day-slot .rbc-event': {
                    margin: '-1px 2px 0 -1px',
                },
                '.rbc-day-slot .rbc-events-container': {
                    marginRight: '2px',
                },
                '.rbc-event-content': {
                    fontSize: 'sm',
                    fontWeight: 'medium',
                },
            }}
            height="full"
        >
            <Calendar
                localizer={bigCalendarLocalizer}
                culture="nb-no"
                events={events}
                date={selectedDate}
                showAllEvents
                views={Object.values(VIEWS).map((viewProperties) => viewProperties.type)} // TODO: add custom view component here
                view={VIEWS[selectedView].type}
                onNavigate={setSelectedDate}
                onView={handleViewChange}
                dayLayoutAlgorithm="no-overlap"
                components={{
                    toolbar: CalendarToolbar,
                }}
                min={set(new Date(), { hours: 6, minutes: 0 })}
            />
        </Box>
    );
};