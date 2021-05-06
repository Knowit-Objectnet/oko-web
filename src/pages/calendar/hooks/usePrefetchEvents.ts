import { QueryClient, useQueryClient } from 'react-query';
import { add } from 'date-fns';
import { ApiEventParams, eventsDefaultQueryKey, getEvents } from '../../../services/EventService';
import { calendarConfig } from '../CalendarConfig';
import { DateRange, View } from 'react-big-calendar';
import { useEffect } from 'react';

const calculateInterval = (intervalToFetch: DateRange, selectedView: View, offset: 1 | -1): ApiEventParams => {
    const fetchInterval = calendarConfig.viewProperties[selectedView].fetchInterval;
    return {
        fromDate: add(intervalToFetch.start, { [fetchInterval]: offset }).toISOString(),
        toDate: add(intervalToFetch.end, { [fetchInterval]: offset }).toISOString(),
    };
};

const prefetchEvents = (queryClient: QueryClient, queryParams: ApiEventParams) =>
    queryClient.prefetchQuery({
        queryKey: [eventsDefaultQueryKey, queryParams],
        queryFn: () => getEvents(queryParams),
    });

export const usePrefetchEvents = (intervalToFetch: DateRange, selectedView: View) => {
    const queryClient = useQueryClient();

    const previousInterval = calculateInterval(intervalToFetch, selectedView, -1);
    const nextInterval = calculateInterval(intervalToFetch, selectedView, 1);

    useEffect(() => {
        prefetchEvents(queryClient, previousInterval);
        prefetchEvents(queryClient, nextInterval);
        return () => {
            queryClient.cancelQueries();
        };
    });
};
