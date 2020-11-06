import { useKeycloak } from '@react-keycloak/web';
import { QueryResult, useQuery } from 'react-query';
import { ApiPartner, getPartnerById, partnersDefaultQueryKey } from '../PartnerService';

export const usePartnerById = (userId: number): QueryResult<ApiPartner> => {
    const [keycloak] = useKeycloak();

    return useQuery<ApiPartner>({
        queryKey: [partnersDefaultQueryKey, userId, keycloak.token],
        queryFn: getPartnerById,
    });
};
