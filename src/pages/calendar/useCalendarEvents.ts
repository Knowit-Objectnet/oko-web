import { useEvents } from '../../services/hooks/useEvents';
import { Event as CalendarEvent } from 'react-big-calendar';
import { CalendarDateRange, CalendarFilters, CalendarState, useCalendar } from './CalendarProvider';
import { ApiEvent, eventsDefaultQueryKey, getEvents } from '../../services/EventService';
import { QueryClient, useQueryClient } from 'react-query';
import { add } from 'date-fns';

enum PrefetchAction {
    'NEXT' = 1,
    'PREV' = -1,
}

const prefetchEvents = (queryClient: QueryClient, state: CalendarState, action: PrefetchAction) => {
    let dateRange: CalendarDateRange;
    switch (state.selectedView) {
        case 'week':
        case 'work_week':
        case 'day':
        case 'agenda':
            dateRange = {
                start: add(state.viewDateRange.start, { weeks: action.valueOf() }),
                end: add(state.viewDateRange.end, { weeks: action.valueOf() }),
            };
            break;
        case 'month':
            dateRange = {
                start: add(state.viewDateRange.start, { months: action.valueOf() }),
                end: add(state.viewDateRange.end, { months: action.valueOf() }),
            };
            break;
        default:
            throw new Error('Unsupported calendar view name provided when calculating date range');
    }
    const queryParams = { fromDate: dateRange.start.toISOString(), toDate: dateRange.end.toISOString() };
    queryClient.prefetchQuery({
        queryKey: [eventsDefaultQueryKey, queryParams],
        queryFn: () => getEvents(queryParams),
    });
};

const applyFilters = (event: ApiEvent, filters: CalendarFilters): boolean => {
    if (filters.stasjonId !== undefined) {
        return event.station.id === filters.stasjonId;
    }
    return true;
};

export const useCalendarEvents = (): CalendarEvent[] => {
    const { state } = useCalendar();

    const queryClient = useQueryClient();

    // TODO: wrap in Lazy Result?
    const { data: events } = useEvents(
        {
            fromDate: state.viewDateRange.start.toISOString(),
            toDate: state.viewDateRange.end.toISOString(),
        },
        {
            onSettled: () => {
                prefetchEvents(queryClient, state, PrefetchAction.PREV);
                prefetchEvents(queryClient, state, PrefetchAction.NEXT);
            },
        },
    );

    return (events ?? [])
        .filter((event) => applyFilters(event, state.filters))
        .map((event) => ({
            start: new Date(event.startDateTime),
            end: new Date(event.endDateTime),
            title: `${event.partner.name} - ${event.station.name}`,
        }));
};
