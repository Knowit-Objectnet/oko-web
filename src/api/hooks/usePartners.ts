import { useKeycloak } from '@react-keycloak/web';
import { QueryResult, useQuery } from 'react-query';
import { ApiPartner, getPartners, partnersDefaultQueryKey } from '../PartnerService';

export const usePartners = (): QueryResult<Array<ApiPartner>> => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiPartner>>({
        queryKey: [partnersDefaultQueryKey, keycloak.token],
        queryFn: getPartners,
    });
};
