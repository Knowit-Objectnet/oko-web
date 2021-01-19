import { useKeycloak } from '@react-keycloak/web';
import { QueryObserverResult, useQuery } from 'react-query';
import { ApiPartner, getPartnerById, partnersDefaultQueryKey } from '../PartnerService';

export const usePartnerById = (userId: number): QueryObserverResult<ApiPartner> => {
    const { keycloak } = useKeycloak();

    return useQuery<ApiPartner>({
        queryKey: [partnersDefaultQueryKey, userId],
        queryFn: () => getPartnerById(userId, keycloak.token),
    });
};
