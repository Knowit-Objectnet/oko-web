import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { aarsakDefaultQueryKey, ApiAarsak, ApiAarsakParams, findAarsak } from './AarsakService';

interface UseAarsakerParams {
    params?: ApiAarsakParams;
    queryOptions?: UseQueryOptions<Array<ApiAarsak>>;
}

export const useAarsaker = (params?: UseAarsakerParams): UseQueryResult<Array<ApiAarsak>> => {
    return useQuery<Array<ApiAarsak>>({
        queryKey: [aarsakDefaultQueryKey, params?.params],
        queryFn: () => findAarsak(params?.params),
        ...params?.queryOptions,
    });
};
