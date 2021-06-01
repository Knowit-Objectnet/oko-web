import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import {
    ApiPlanlagtHenting,
    ApiPlanlagtHentingParams,
    getPlanlagteHentinger,
    planlagtHentingDefaultQueryKey,
} from './HentingService';

export const usePlanlagteHentinger = (
    params: ApiPlanlagtHentingParams = {},
    queryOptions?: UseQueryOptions<Array<ApiPlanlagtHenting>>,
): UseQueryResult<Array<ApiPlanlagtHenting>> => {
    return useQuery<Array<ApiPlanlagtHenting>>({
        queryKey: [planlagtHentingDefaultQueryKey],
        queryFn: () => getPlanlagteHentinger(params),
        ...queryOptions,
    });
};
