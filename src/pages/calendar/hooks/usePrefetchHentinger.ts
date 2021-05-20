import { QueryClient, useQueryClient } from 'react-query';
import { add, Duration } from 'date-fns';
import { VIEWS } from './useCalendarView';
import { useCalendarState } from '../CalendarProvider';
import { ApiHentingParams, getHentinger, hentingDefaultQueryKey } from '../../../services-currentapi/HentingService';

const calculateInterval = (
    intervalToFetch: Interval,
    intervalSize: keyof Duration,
    offset: 1 | -1,
): ApiHentingParams => ({
    after: add(intervalToFetch.start, { [intervalSize]: offset }).toISOString(),
    before: add(intervalToFetch.end, { [intervalSize]: offset }).toISOString(),
});

const prefetchHentinger = (queryClient: QueryClient, queryParams: ApiHentingParams) =>
    queryClient.prefetchQuery({
        queryKey: [hentingDefaultQueryKey, queryParams],
        queryFn: () => getHentinger(queryParams),
    });

export const usePrefetchHentinger = (currentInterval: Interval): void => {
    const { selectedView } = useCalendarState();
    const intervalSize = VIEWS[selectedView].fetchInterval;
    const previousInterval = calculateInterval(currentInterval, intervalSize, -1);
    const nextInterval = calculateInterval(currentInterval, intervalSize, 1);

    const queryClient = useQueryClient();
    prefetchHentinger(queryClient, previousInterval);
    prefetchHentinger(queryClient, nextInterval);
};
