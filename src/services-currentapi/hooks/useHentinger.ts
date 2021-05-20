import { UseQueryResult, useQuery, UseQueryOptions } from 'react-query';
import { ApiHenting, ApiHentingParams, getHentinger, hentingDefaultQueryKey } from '../HentingService';

export const useHentinger = (
    params: ApiHentingParams = {},
    queryOptions?: UseQueryOptions<Array<ApiHenting>>,
): UseQueryResult<Array<ApiHenting>> => {
    return useQuery<Array<ApiHenting>>({
        queryKey: [hentingDefaultQueryKey, params],
        queryFn: () => getHentinger(params),
        ...queryOptions,
    });
};
