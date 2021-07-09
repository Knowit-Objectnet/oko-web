import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { aarsakDefaultQueryKey, ApiAarsak, ApiAarsakParams, findAarsak } from './AarsakService';

export const useAarsaker = (
    params?: ApiAarsakParams,
    queryOptions?: UseQueryOptions<Array<ApiAarsak>>,
): UseQueryResult<Array<ApiAarsak>> => {
    return useQuery<Array<ApiAarsak>>({
        queryKey: [aarsakDefaultQueryKey, params],
        queryFn: () => findAarsak(params),
        ...queryOptions,
    });
};
