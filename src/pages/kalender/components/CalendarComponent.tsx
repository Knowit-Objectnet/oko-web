import * as React from 'react';
import { Calendar, Culture, dateFnsLocalizer, DateLocalizer, DateRange, Formats, View } from 'react-big-calendar';
import { nb } from 'date-fns/locale';
import { format, getDay, getISOWeek, parse, set, startOfWeek } from 'date-fns';
import { CalendarToolbar } from './CalendarToolbar';
import { EventWrapper } from './EventWrapper';
import { CalendarEvent, useCalendarEvents } from '../hooks/useCalendarEvents';
import { getCalendarViewFromType, VIEWS } from '../hooks/useCalendarView';
import { useCalendarState } from '../CalendarProvider';
import { Box } from '@chakra-ui/layout';
import { Loading } from '../../../components/Loading';

// TODO: write our own CSS for the calendar
import '../calendar-style.css';

export const CalendarComponent: React.FC = () => {
    const { selectedView, setSelectedView, selectedDate, setSelectedDate } = useCalendarState();

    // TODO: display error status in calendar
    const eventsLazyResult = useCalendarEvents();

    const handleViewChange = (view: View) => {
        const calendarView = getCalendarViewFromType(view);
        setSelectedView(calendarView);
    };

    const formats: Formats = {
        dayRangeHeaderFormat: (range: DateRange, culture?: Culture, localizer?: DateLocalizer) => {
            if (culture != 'nb-no') `Week ${getISOWeek(range.start)}`;
            return `Uke ${getISOWeek(range.start)}`;
        },
        dayHeaderFormat: (date: Date, culture?: Culture, localizer?: DateLocalizer) => {
            return `${localizer?.format(date, 'cccc dd', culture || 'nb-no')}`;
        },
    };

    return (
        <Box width="full" height="full" position="relative">
            {eventsLazyResult.isLoading() ? (
                <Box
                    width="full"
                    height="full"
                    position="absolute"
                    backgroundColor="hsla(0, 0%, 100%, 25%)"
                    zIndex="15"
                >
                    <Loading hideLabel />
                </Box>
            ) : null}
            <Calendar<CalendarEvent>
                culture="nb-no"
                events={eventsLazyResult.isSuccess() ? eventsLazyResult.value() : []}
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
                formats={formats}
            />
        </Box>
    );
};
