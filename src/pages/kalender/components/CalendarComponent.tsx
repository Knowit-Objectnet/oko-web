import * as React from 'react';
import { Calendar, dateFnsLocalizer, EventWrapperProps, View } from 'react-big-calendar';
import { nb } from 'date-fns/locale';
import { format, getDay, parse, set, startOfWeek } from 'date-fns';
import { CalendarToolbar } from './CalendarToolbar';
import { CalendarEvent, useCalendarEvents } from '../hooks/useCalendarEvents';
import { getCalendarViewFromType, VIEWS } from '../hooks/useCalendarView';
import { useCalendarState } from '../CalendarProvider';
import { WeekOrDayEvent } from './WeekOrDayEvent';
import { EventComponent } from './EventComponent';
import { Box } from '@chakra-ui/layout';

// TODO: write our own CSS for the calendar
import '../calendar-style.css';

const EventWrapper: React.FC<EventWrapperProps<CalendarEvent>> = ({ style, event }) => {
    // This is a bit "hacky", but the easiest way I've been able to find for identifying the
    // current type of view for the Calendar. The month view renders the wrapper component differently.
    const viewIsWeekOrDay = style !== undefined;

    if (viewIsWeekOrDay) {
        return <WeekOrDayEvent event={event} style={style} />;
    }
    return <EventComponent event={event} compactView />;
};

export const CalendarComponent: React.FC = () => {
    const { selectedView, setSelectedView, selectedDate, setSelectedDate } = useCalendarState();

    // TODO: get loading-status for displaying in calendar
    const events = useCalendarEvents();

    const handleViewChange = (view: View) => {
        const calendarView = getCalendarViewFromType(view);
        setSelectedView(calendarView);
    };

    return (
        <Box width="full" height="full">
            <Calendar<CalendarEvent>
                culture="nb-no"
                events={events}
                date={selectedDate}
                views={Object.values(VIEWS).map((viewProperties) => viewProperties.type)}
                view={VIEWS[selectedView].type}
                onNavigate={setSelectedDate}
                onView={handleViewChange}
                drilldownView={null}
                dayLayoutAlgorithm="no-overlap"
                showAllEvents
                components={{
                    toolbar: CalendarToolbar,
                    eventWrapper: EventWrapper,
                }}
                min={set(new Date(), { hours: 6, minutes: 0 })}
                localizer={dateFnsLocalizer({
                    format,
                    parse,
                    startOfWeek,
                    getDay,
                    locales: { 'nb-no': nb },
                })}
                messages={{
                    date: 'Dato',
                    time: 'Tidspunkt',
                    event: 'Hendelse',
                    allDay: 'Hele dagen',
                    week: 'Uke',
                    work_week: 'Arbeidsuke',
                    day: 'Dag',
                    month: 'Måned',
                    previous: 'Forrige',
                    next: 'Neste',
                    yesterday: 'I går',
                    tomorrow: 'I morgen',
                    today: 'I dag',
                    agenda: 'Liste',
                    noEventsInRange: 'Det finnes ingen hendelser i dette tidsrommet',
                }}
            />
        </Box>
    );
};
