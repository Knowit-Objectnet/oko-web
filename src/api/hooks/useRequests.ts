import { useKeycloak } from '@react-keycloak/web';
import { QueryObserverResult, useQuery } from 'react-query';
import { ApiRequest, ApiRequestParams, getRequests, requestsDefaultQueryKey } from '../RequestService';

export const useRequests = (params: ApiRequestParams = {}): QueryObserverResult<Array<ApiRequest>> => {
    const { keycloak } = useKeycloak();

    return useQuery<Array<ApiRequest>>({
        queryKey: [requestsDefaultQueryKey, params],
        queryFn: () => getRequests(params, keycloak.token),
    });
};
