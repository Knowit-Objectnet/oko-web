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
        // Returning previously fetched data by default, while waiting for a refetch. If it is important
        //  to not use potentially stale data, override `keepPreviousData` by passing false in the params.queryOptions argument
        keepPreviousData: true,
        // Always returning stasjoner alphabetically sorted. Override this by passing another `select`-callback
        //  in the params.queryOptions argument
        select: (data) => data.sort((stasjonA, stasjonB) => stasjonA.navn.localeCompare(stasjonB.navn, 'nb')),
        ...params?.queryOptions,
    });
};
