import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiHentingParams, ApiHentingWrapper, getHentinger, hentingDefaultQueryKey } from './HentingService';

export const useHentinger = (
    params?: ApiHentingParams,
    queryOptions?: UseQueryOptions<Array<ApiHentingWrapper>>,
): UseQueryResult<Array<ApiHentingWrapper>> => {
    return useQuery<Array<ApiHentingWrapper>>({
        queryKey: [hentingDefaultQueryKey, params],
        queryFn: () => getHentinger(params),
        ...queryOptions,
    });
};
