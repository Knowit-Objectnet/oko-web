import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiPlanlagtHenting, getPlanlagtHentingById, planlagtHentingDefaultQueryKey } from './HentingService';

export const usePlanlagtHentingById = (
    hentingId: string,
    queryOptions?: UseQueryOptions<ApiPlanlagtHenting>,
): UseQueryResult<ApiPlanlagtHenting> => {
    return useQuery<ApiPlanlagtHenting>({
        queryKey: [planlagtHentingDefaultQueryKey, hentingId],
        queryFn: () => getPlanlagtHentingById(hentingId),
        ...queryOptions,
    });
};
