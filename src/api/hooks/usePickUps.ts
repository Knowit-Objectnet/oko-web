import { useKeycloak } from '@react-keycloak/web';
import { QueryResult, useQuery } from 'react-query';
import { ApiPickUp, ApiPickUpParams, getPickUps, pickUpsDefaultQueryKey } from '../PickUpService';

export const usePickUps = (params: ApiPickUpParams = {}): QueryResult<Array<ApiPickUp>> => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiPickUp>>({
        queryKey: [pickUpsDefaultQueryKey, params],
        queryFn: () => getPickUps(params, keycloak.token),
    });
};
