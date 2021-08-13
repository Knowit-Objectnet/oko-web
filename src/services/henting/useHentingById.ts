import { UseQueryOptions } from 'react-query';
import { useQueryWithLazyResult } from '../useQueryWithLazyResult';
import { LazyResult } from 'lemons';
import { ApiError } from '../httpClient';
import { ApiHentingWrapper, getHentingById, hentingDefaultQueryKey } from './HentingService';

export const useHentingById = (
    hentingId: string,
    queryOptions?: UseQueryOptions<ApiHentingWrapper, ApiError>,
): LazyResult<ApiError, ApiHentingWrapper> => {
    return useQueryWithLazyResult<ApiHentingWrapper, ApiError>({
        queryKey: [hentingDefaultQueryKey, hentingId],
        queryFn: () => getHentingById(hentingId),
        ...queryOptions,
    });
};
