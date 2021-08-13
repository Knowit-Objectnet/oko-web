import { UseQueryOptions } from 'react-query';
import { ApiPlanlagtHenting, getPlanlagtHentingById, planlagtHentingDefaultQueryKey } from './PlanlagtHentingService';
import { useQueryWithLazyResult } from '../useQueryWithLazyResult';
import { LazyResult } from 'lemons';
import { ApiError } from '../httpClient';

export const usePlanlagtHentingById = (
    hentingId: string,
    queryOptions?: UseQueryOptions<ApiPlanlagtHenting, ApiError>,
): LazyResult<ApiError, ApiPlanlagtHenting> => {
    return useQueryWithLazyResult<ApiPlanlagtHenting, ApiError>({
        queryKey: [planlagtHentingDefaultQueryKey, hentingId],
        queryFn: () => getPlanlagtHentingById(hentingId),
        ...queryOptions,
    });
};
