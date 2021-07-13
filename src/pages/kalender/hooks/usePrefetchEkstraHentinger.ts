import { QueryClient, useQueryClient } from 'react-query';
import { add, Duration } from 'date-fns';
import { VIEWS } from './useCalendarView';
import { useCalendarState } from '../CalendarProvider';
import {
    ApiEkstraHentingParams,
    ekstraHentingDefaultQueryKey,
    getEkstraHentinger,
} from '../../../services/henting/EkstraHentingService';

const calculateInterval = (
    intervalToFetch: Interval,
    intervalSize: keyof Duration,
    offset: 1 | -1,
): ApiEkstraHentingParams => ({
    after: add(intervalToFetch.start, { [intervalSize]: offset }).toISOString(),
    before: add(intervalToFetch.end, { [intervalSize]: offset }).toISOString(),
});

//TODO: Should this be based on a general Henting, rather than EkstraHenting?
const prefetchEkstraHentinger = (queryClient: QueryClient, queryParams: ApiEkstraHentingParams) =>
    queryClient.prefetchQuery({
        queryKey: [ekstraHentingDefaultQueryKey, queryParams],
        queryFn: () => getEkstraHentinger(queryParams),
    });

export const usePrefetchEkstraHentinger = (currentInterval: Interval): void => {
    const { selectedView } = useCalendarState();
    const intervalSize = VIEWS[selectedView].fetchInterval;
    const previousInterval = calculateInterval(currentInterval, intervalSize, -1);
    const nextInterval = calculateInterval(currentInterval, intervalSize, 1);

    const queryClient = useQueryClient();
    prefetchEkstraHentinger(queryClient, previousInterval);
    prefetchEkstraHentinger(queryClient, nextInterval);
};
