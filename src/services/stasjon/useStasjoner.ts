import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiStasjon, ApiStasjonParams, getStasjoner, stasjonDefaultQueryKey } from './StasjonService';

export const useStasjoner = (
    params?: ApiStasjonParams,
    queryOptions?: UseQueryOptions<Array<ApiStasjon>>,
): UseQueryResult<Array<ApiStasjon>> => {
    return useQuery<Array<ApiStasjon>>({
        // Note: `usePrefetchStasjoner` passes `undefined` as the second key, as this is the default `params` value.
        //  If you make changes to the key here, make sure that it is reflected in `usePrefetchStasjoner` as well.
        queryKey: [stasjonDefaultQueryKey, params],
        queryFn: () => getStasjoner(params),
        ...queryOptions,
    });
};
