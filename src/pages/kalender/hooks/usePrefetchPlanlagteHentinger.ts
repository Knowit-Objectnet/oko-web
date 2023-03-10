import { QueryClient, useQueryClient } from 'react-query';
import { add, Duration } from 'date-fns';
import { VIEWS } from './useCalendarView';
import { useCalendarState } from '../CalendarProvider';
import {
    ApiPlanlagtHentingParams,
    getPlanlagteHentinger,
    planlagtHentingDefaultQueryKey,
} from '../../../services/henting/PlanlagtHentingService';

const calculateInterval = (
    intervalToFetch: Interval,
    intervalSize: keyof Duration,
    offset: 1 | -1,
): ApiPlanlagtHentingParams => ({
    after: add(intervalToFetch.start, { [intervalSize]: offset }).toISOString(),
    before: add(intervalToFetch.end, { [intervalSize]: offset }).toISOString(),
});

//TODO: Should this be based on a general Henting, rather than PlanlagtHenting?
const prefetchPlanlagteHentinger = (queryClient: QueryClient, queryParams: ApiPlanlagtHentingParams) =>
    queryClient.prefetchQuery({
        queryKey: [planlagtHentingDefaultQueryKey, queryParams],
        queryFn: () => getPlanlagteHentinger(queryParams),
    });

export const usePrefetchPlanlagteHentinger = (currentInterval: Interval): void => {
    const { selectedView } = useCalendarState();
    const intervalSize = VIEWS[selectedView].fetchInterval;
    const previousInterval = calculateInterval(currentInterval, intervalSize, -1);
    const nextInterval = calculateInterval(currentInterval, intervalSize, 1);

    const queryClient = useQueryClient();
    prefetchPlanlagteHentinger(queryClient, previousInterval);
    prefetchPlanlagteHentinger(queryClient, nextInterval);
};
