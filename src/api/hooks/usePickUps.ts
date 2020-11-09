import { useKeycloak } from '@react-keycloak/web';
import { QueryResult, useQuery } from 'react-query';
import { ApiPickUp, getPickUps, pickUpsDefaultQueryKey } from '../PickUpService';

export const usePickUps = (): QueryResult<Array<ApiPickUp>> => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiPickUp>>({
        queryKey: [pickUpsDefaultQueryKey, keycloak.token],
        queryFn: getPickUps,
    });
};
