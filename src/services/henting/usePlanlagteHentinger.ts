import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import {
    ApiPlanlagtHenting,
    ApiPlanlagtHentingParams,
    getPlanlagteHentinger,
    planlagtHentingDefaultQueryKey,
} from './PlanlagtHentingService';

export const usePlanlagteHentinger = (
    params?: ApiPlanlagtHentingParams,
    queryOptions?: UseQueryOptions<Array<ApiPlanlagtHenting>>,
): UseQueryResult<Array<ApiPlanlagtHenting>> => {
    return useQuery<Array<ApiPlanlagtHenting>>({
        queryKey: [planlagtHentingDefaultQueryKey, params],
        queryFn: () => getPlanlagteHentinger(params),
        ...queryOptions,
    });
};
