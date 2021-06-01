import { QueryObserverResult, useQuery } from 'react-query';
import { ApiPartner, getPartnerById, partnersDefaultQueryKey } from '../PartnerService';

export const usePartnerById = (userId: number): QueryObserverResult<ApiPartner> => {
    return useQuery<ApiPartner>({
        queryKey: [partnersDefaultQueryKey, userId],
        queryFn: () => getPartnerById(userId),
    });
};
