import { useEvents } from '../../../services/hooks/useEvents';
import { Event as CalendarEvent } from 'react-big-calendar';
import { CalendarFilters, useCalendar } from '../CalendarProvider';
import { ApiEvent } from '../../../services/EventService';
import { usePrefetchEvents } from './usePrefetchEvents';

const REFETCH_INTERVAL_MS = 30_000;

const applyFilters = (event: ApiEvent, filters: CalendarFilters): boolean => {
    if (filters.stasjonId !== undefined) {
        return event.station.id === filters.stasjonId;
    }
    return true;
};

export const useCalendarEvents = (): CalendarEvent[] => {
    const { state } = useCalendar();

    // TODO: wrap in LazyResult in order to return loading/error status?
    const { data: events } = useEvents(
        {
            fromDate: state.viewDateRange.start.toISOString(),
            toDate: state.viewDateRange.end.toISOString(),
        },
        {
            keepPreviousData: true,
            refetchInterval: REFETCH_INTERVAL_MS,
        },
    );

    usePrefetchEvents();

    return (events ?? [])
        .filter((event) => applyFilters(event, state.filters))
        .map((event) => ({
            start: new Date(event.startDateTime),
            end: new Date(event.endDateTime),
            title: `${event.partner.name} - ${event.station.name}`,
        }));
};
