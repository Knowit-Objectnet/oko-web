import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiEkstraHenting, ekstraHentingDefaultQueryKey, getEkstraHentingById } from './EkstraHentingService';

export const useEkstraHentingById = (
    id: string,
    queryOptions?: UseQueryOptions<ApiEkstraHenting>,
): UseQueryResult<ApiEkstraHenting> => {
    return useQuery<ApiEkstraHenting>({
        queryKey: [ekstraHentingDefaultQueryKey, id],
        queryFn: () => getEkstraHentingById(id),
        ...queryOptions,
    });
};
