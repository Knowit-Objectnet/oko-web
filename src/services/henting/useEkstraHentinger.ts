import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import {
    ApiEkstraHenting,
    ApiEkstraHentingParams,
    ekstraHentingDefaultQueryKey,
    getEkstraHentinger,
} from './EkstraHentingService';

export const useEkstraHentinger = (
    params?: ApiEkstraHentingParams,
    queryOptions?: UseQueryOptions<Array<ApiEkstraHenting>>,
): UseQueryResult<Array<ApiEkstraHenting>> => {
    return useQuery<Array<ApiEkstraHenting>>({
        queryKey: [ekstraHentingDefaultQueryKey, params],
        queryFn: () => getEkstraHentinger(params),
        ...queryOptions,
    });
};
