import { useKeycloak } from '@react-keycloak/web';
import { QueryObserverResult, useQuery } from 'react-query';
import { ApiPartner, getPartners, partnersDefaultQueryKey } from '../PartnerService';

export const usePartners = (): QueryObserverResult<Array<ApiPartner>> => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiPartner>>({
        queryKey: [partnersDefaultQueryKey],
        queryFn: () => getPartners(keycloak.token),
    });
};
