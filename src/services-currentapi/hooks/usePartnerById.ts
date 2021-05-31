import { QueryObserverResult, useQuery } from 'react-query';
import { ApiPartner, ApiPartnerParams, getPartnerById, getPartnere, partnerDefaultQueryKey } from '../AktorService';

export const usePartnerById = (id: string): QueryObserverResult<ApiPartner> => {
    return useQuery<ApiPartner>({
        queryKey: [partnerDefaultQueryKey, id],
        queryFn: () => getPartnerById(id),
    });
};
