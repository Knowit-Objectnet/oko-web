import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, EventWrapperProps, View } from 'react-big-calendar';
import { nb } from 'date-fns/locale';
import { format, getDay, parse, set, startOfWeek } from 'date-fns';
import { CalendarToolbar } from './CalendarToolbar';
import { CalendarEvent, useCalendarEvents } from './hooks/useCalendarEvents';
import { getCalendarViewFromType, VIEWS } from './hooks/useCalendarView';
import { useCalendarState } from './CalendarProvider';
import { HentingDetails } from './HentingDetails';
import { Box } from '@chakra-ui/layout';
import { WeekOrDayEvent } from './components/WeekOrDayEvent';
import { MonthViewEvent } from './components/MonthViewEvent';

// TODO: write our own CSS for the calendar
import './calendar-style.css';

export const CalendarComponent: React.FC = () => {
    const { selectedView, setSelectedView, selectedDate, setSelectedDate } = useCalendarState();

    // TODO: get loading-status for displaying in calendar
    const events = useCalendarEvents();
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(undefined);

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

    const EventWrapper: React.FC<EventWrapperProps> = ({ style, event }) => {
        // This is a bit "hacky", but the easiest way I've been able to find for identifying the
        // current type of view for the Calendar. The month view
        const isWeekOrDayEvent = style !== undefined;

        const handleEventClick = () => {
            setSelectedEvent(event);
        };

        if (isWeekOrDayEvent) {
            return <WeekOrDayEvent event={event} style={style} onClick={handleEventClick} />;
        }
        return <MonthViewEvent event={event} onClick={handleEventClick} />;
    };

    return (
        <>
            <Box
                sx={{
                    '.rbc-day-slot .rbc-event': {
                        margin: '-1px 2px 0 -1px',
                    },
                    '.rbc-day-slot .rbc-events-container': {
                        marginRight: '2px',
                    },
                }}
                height="full"
                width="full"
            >
                <Calendar
                    localizer={bigCalendarLocalizer}
                    culture="nb-no"
                    events={events}
                    date={selectedDate}
                    showAllEvents
                    views={Object.values(VIEWS).map((viewProperties) => viewProperties.type)}
                    view={VIEWS[selectedView].type}
                    onNavigate={setSelectedDate}
                    onView={handleViewChange}
                    drilldownView={null}
                    dayLayoutAlgorithm="no-overlap"
                    components={{
                        toolbar: CalendarToolbar,
                        eventWrapper: EventWrapper,
                    }}
                    min={set(new Date(), { hours: 6, minutes: 0 })}
                />
            </Box>
            <HentingDetails
                henting={selectedEvent}
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(undefined)}
            />
        </>
    );
};
