import { QueryObserverResult, useQuery } from 'react-query';
import { ApiPartner, ApiPartnerParams, getPartnere, partnerDefaultQueryKey } from '../AktorService';

export const usePartnere = (params: ApiPartnerParams = {}): QueryObserverResult<Array<ApiPartner>> => {
    return useQuery<Array<ApiPartner>>({
        queryKey: [partnerDefaultQueryKey],
        queryFn: () => getPartnere(params),
    });
};
