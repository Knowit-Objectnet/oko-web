import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiPartner, getPartnerById, partnerDefaultQueryKey } from './PartnerService';

export const usePartnerById = (
    partnerId: string,
    queryOptions?: UseQueryOptions<ApiPartner>,
): UseQueryResult<ApiPartner> => {
    return useQuery<ApiPartner>({
        queryKey: [partnerDefaultQueryKey, partnerId],
        queryFn: () => getPartnerById(partnerId),
        ...queryOptions,
    });
};
