import { UseQueryOptions } from 'react-query';
import { ApiPlanlagtHenting, getPlanlagtHentingById, planlagtHentingDefaultQueryKey } from './PlanlagtHentingService';
import { useQueryWithLazyResult } from '../useQueryWithLazyResult';
import { LazyResult } from 'lemons';
import { ApiError } from '../httpClient';
import { ApiHenting, getHentingById } from './HentingService';

export const useHentingById = (
    hentingId: string,
    queryOptions?: UseQueryOptions<ApiHenting, ApiError>,
): LazyResult<ApiError, ApiHenting> => {
    return useQueryWithLazyResult<ApiHenting, ApiError>({
        queryKey: [planlagtHentingDefaultQueryKey, hentingId],
        queryFn: () => getHentingById(hentingId),
        ...queryOptions,
    });
};
