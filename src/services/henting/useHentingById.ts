import { UseQueryOptions } from 'react-query';
import { ApiPlanlagtHenting, getPlanlagtHentingById, planlagtHentingDefaultQueryKey } from './PlanlagtHentingService';
import { useQueryWithLazyResult } from '../useQueryWithLazyResult';
import { LazyResult } from 'lemons';
import { ApiError } from '../httpClient';
import { ApiHentingWrapper, getHentingById } from './HentingService';

export const useHentingById = (
    hentingId: string,
    queryOptions?: UseQueryOptions<ApiHentingWrapper, ApiError>,
): LazyResult<ApiError, ApiHentingWrapper> => {
    return useQueryWithLazyResult<ApiHentingWrapper, ApiError>({
        queryKey: [planlagtHentingDefaultQueryKey, hentingId],
        queryFn: () => getHentingById(hentingId),
        ...queryOptions,
    });
};
