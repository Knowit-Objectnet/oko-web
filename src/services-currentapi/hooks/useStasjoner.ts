import { QueryClient, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiStasjon, ApiStasjonParams, getStasjoner, stasjonDefaultQueryKey } from '../StasjonService';

export const useStasjoner = (
    params: ApiStasjonParams = {},
    queryOptions?: UseQueryOptions<Array<ApiStasjon>>,
): UseQueryResult<Array<ApiStasjon>> => {
    return useQuery<Array<ApiStasjon>>({
        queryKey: [stasjonDefaultQueryKey],
        queryFn: () => getStasjoner(params),
        ...queryOptions,
    });
};

export const prefetchStasjoner = (queryClient: QueryClient): void => {
    queryClient.prefetchQuery({
        queryKey: [stasjonDefaultQueryKey],
        queryFn: () => getStasjoner(),
    });
};
