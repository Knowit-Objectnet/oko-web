import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { aarsakDefaultQueryKey, ApiAarsak, findOneAarsak } from './AarsakService';

export const useAarsakById = (
    aarsakId: string,
    queryOptions?: UseQueryOptions<ApiAarsak>,
): UseQueryResult<ApiAarsak> => {
    return useQuery<ApiAarsak>({
        queryKey: [aarsakDefaultQueryKey, aarsakId],
        queryFn: () => findOneAarsak(aarsakId),
        ...queryOptions,
    });
};
