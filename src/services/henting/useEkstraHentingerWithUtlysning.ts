import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import {
    ApiEkstraHenting,
    ApiEkstraHentingParams,
    ekstraHentingDefaultQueryKey,
    getEkstraHentingerWithUtlysning,
} from './EkstraHentingService';

export const useEkstraHentingerWithUtlysning = (
    params?: ApiEkstraHentingParams,
    queryOptions?: UseQueryOptions<Array<ApiEkstraHenting>>,
): UseQueryResult<Array<ApiEkstraHenting>> => {
    return useQuery<Array<ApiEkstraHenting>>({
        queryKey: [ekstraHentingDefaultQueryKey, params],
        queryFn: () => getEkstraHentingerWithUtlysning(params),
        ...queryOptions,
    });
};
