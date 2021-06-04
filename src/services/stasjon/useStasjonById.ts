import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiStasjon, getStasjonById, stasjonDefaultQueryKey } from './StasjonService';

export const useStasjonById = (
    stasjonId: string,
    queryOptions?: UseQueryOptions<ApiStasjon>,
): UseQueryResult<ApiStasjon> => {
    return useQuery<ApiStasjon>({
        queryKey: [stasjonDefaultQueryKey, stasjonId],
        queryFn: () => getStasjonById(stasjonId),
        ...queryOptions,
    });
};
