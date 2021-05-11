import { QueryClient, useQueryClient } from 'react-query';
import { add, Duration } from 'date-fns';
import { ApiEventParams, eventsDefaultQueryKey, getEvents } from '../../../services/EventService';
import { VIEWS } from './useCalendarView';
import { useCalendarState } from '../CalendarProvider';

const calculateInterval = (
    intervalToFetch: Interval,
    intervalSize: keyof Duration,
    offset: 1 | -1,
): ApiEventParams => ({
    fromDate: add(intervalToFetch.start, { [intervalSize]: offset }).toISOString(),
    toDate: add(intervalToFetch.end, { [intervalSize]: offset }).toISOString(),
});

const prefetchEvents = (queryClient: QueryClient, queryParams: ApiEventParams) =>
    queryClient.prefetchQuery({
        queryKey: [eventsDefaultQueryKey, queryParams],
        queryFn: () => getEvents(queryParams),
    });

export const usePrefetchEvents = (currentInterval: Interval): void => {
    const { selectedView } = useCalendarState();
    const intervalSize = VIEWS[selectedView].fetchInterval;
    const previousInterval = calculateInterval(currentInterval, intervalSize, -1);
    const nextInterval = calculateInterval(currentInterval, intervalSize, 1);

    const queryClient = useQueryClient();
    prefetchEvents(queryClient, previousInterval);
    prefetchEvents(queryClient, nextInterval);
};
