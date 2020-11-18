import { useKeycloak } from '@react-keycloak/web';
import { QueryResult, useQuery } from 'react-query';
import { ApiRequest, ApiRequestParams, getRequests, requestsDefaultQueryKey } from '../RequestService';

export const useRequests = (params: ApiRequestParams = {}): QueryResult<Array<ApiRequest>> => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiRequest>>({
        queryKey: [requestsDefaultQueryKey, params, keycloak.token],
        queryFn: getRequests,
    });
};
