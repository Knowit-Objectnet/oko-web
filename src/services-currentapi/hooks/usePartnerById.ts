import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import { ApiPartner, ApiPartnerParams, getPartnerById, getPartnere, partnerDefaultQueryKey } from '../AktorService';

export const usePartnerById = (
    id: string,
    queryOptions?: UseQueryOptions<ApiPartner>,
): QueryObserverResult<ApiPartner> => {
    return useQuery<ApiPartner>({
        queryKey: [partnerDefaultQueryKey, id],
        queryFn: () => getPartnerById(id),
        ...queryOptions,
    });
};
