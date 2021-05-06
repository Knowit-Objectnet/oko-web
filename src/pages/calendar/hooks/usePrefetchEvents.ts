import { QueryClient, useQueryClient } from 'react-query';
import { CalendarState } from '../CalendarProvider';
import { add } from 'date-fns';
import { ApiEventParams, eventsDefaultQueryKey, getEvents } from '../../../services/EventService';
import { calendarConfig } from '../CalendarConfig';
import { useCalendar } from '../useCalendar';

const calculateInterval = (state: CalendarState, offset: 1 | -1): ApiEventParams => {
    const fetchInterval = calendarConfig.viewProperties[state.selectedView].fetchInterval;
    return {
        fromDate: add(state.viewDateRange.start, { [fetchInterval]: offset }).toISOString(),
        toDate: add(state.viewDateRange.end, { [fetchInterval]: offset }).toISOString(),
    };
};

const prefetchEvents = (queryClient: QueryClient, queryParams: ApiEventParams) => {
    queryClient.prefetchQuery({
        queryKey: [eventsDefaultQueryKey, queryParams],
        queryFn: () => getEvents(queryParams),
    });
};

export const usePrefetchEvents = () => {
    const { state } = useCalendar();
    const queryClient = useQueryClient();

    const previousInterval = calculateInterval(state, -1);
    prefetchEvents(queryClient, previousInterval);

    const nextInterval = calculateInterval(state, 1);
    prefetchEvents(queryClient, nextInterval);
};
