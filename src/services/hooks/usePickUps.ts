import { useKeycloak } from '@react-keycloak/web';
import { QueryObserverResult, useQuery } from 'react-query';
import { ApiPickUp, ApiPickUpParams, getPickUps, pickUpsDefaultQueryKey } from '../PickUpService';

export const usePickUps = (params: ApiPickUpParams = {}): QueryObserverResult<Array<ApiPickUp>> => {
    const { keycloak } = useKeycloak();

    return useQuery<Array<ApiPickUp>>({
        queryKey: [pickUpsDefaultQueryKey, params],
        queryFn: () => getPickUps(params, keycloak.token),
    });
};
