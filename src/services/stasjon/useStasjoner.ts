import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiStasjon, ApiStasjonParams, getStasjoner, stasjonDefaultQueryKey } from './StasjonService';

interface UseStasjonerParams {
    params?: ApiStasjonParams;
    queryOptions?: UseQueryOptions<Array<ApiStasjon>>;
}

export const useStasjoner = (params?: UseStasjonerParams): UseQueryResult<Array<ApiStasjon>> => {
    return useQuery<Array<ApiStasjon>>({
        // Note: `usePrefetchStasjoner` passes `undefined` as the second key, as this is the default `params` value.
        //  If you make changes to the key here, make sure that it is reflected in `usePrefetchStasjoner` as well.
        queryKey: [stasjonDefaultQueryKey, params?.params],
        queryFn: () => getStasjoner(params?.params),
        ...params?.queryOptions,
    });
};
