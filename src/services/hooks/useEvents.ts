import { UseQueryResult, useQuery, UseQueryOptions } from 'react-query';
import { ApiEvent, ApiEventParams, getEvents, eventsDefaultQueryKey } from '../EventService';

export const useEvents = (
    params: ApiEventParams = {},
    queryOptions?: UseQueryOptions<Array<ApiEvent>>,
): UseQueryResult<Array<ApiEvent>> => {
    return useQuery<Array<ApiEvent>>({
        queryKey: [eventsDefaultQueryKey, params],
        queryFn: () => getEvents(params),
        ...queryOptions,
    });
};
