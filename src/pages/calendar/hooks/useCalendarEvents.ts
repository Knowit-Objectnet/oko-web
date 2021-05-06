import { useEvents } from '../../../services/hooks/useEvents';
import { DateRange, Event as CalendarEvent } from 'react-big-calendar';
import { usePrefetchEvents } from './usePrefetchEvents';
import { calendarConfig, CalendarView } from '../CalendarConfig';
import { endOfISOWeek, endOfMonth, startOfISOWeek, startOfMonth } from 'date-fns';
import { useCalendarState } from './useCalendarState';
import { ApiEvent } from '../../../services/EventService';
import { CalendarFilters, CalendarState } from '../CalendarProvider';

const applyFilters = (event: ApiEvent, filters: CalendarFilters): boolean => {
    if (filters.stasjonId !== undefined) {
        return event.station.id === filters.stasjonId;
    }
    return true;
};

const calculateDateRange = (date: Date, view: CalendarView): DateRange => {
    const intervalSize = calendarConfig.viewProperties[view].fetchInterval;
    switch (intervalSize) {
        case 'weeks':
            return {
                start: startOfISOWeek(date),
                end: endOfISOWeek(date),
            };
        case 'months':
            return {
                start: startOfMonth(date),
                end: endOfMonth(date),
            };
        default:
            throw new Error('Unsupported calendar view name provided when calculating date range');
    }
};

const transformToCalendarEvent = () => (event: ApiEvent): CalendarEvent => ({
    start: new Date(event.startDateTime),
    end: new Date(event.endDateTime),
    title: `${event.partner.name} - ${event.station.name}`,
});

export const useCalendarEvents = (): CalendarEvent[] => {
    const { selectedView, state } = useCalendarState();

    const intervalToFetch = calculateDateRange(state.selectedDate, selectedView);

    // TODO: wrap in LazyResult in order to return loading/error status?
    const { data: events } = useEvents(
        {
            fromDate: intervalToFetch.start.toISOString(),
            toDate: intervalToFetch.end.toISOString(),
        },
        {
            keepPreviousData: true,
            refetchInterval: calendarConfig.refetchIntervalMs,
        },
    );

    usePrefetchEvents(intervalToFetch);

    return (events ?? []).filter((event) => applyFilters(event, state.filters)).map(transformToCalendarEvent());
};
