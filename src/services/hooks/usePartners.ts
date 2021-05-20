import { QueryObserverResult, useQuery } from 'react-query';
import { ApiPartner, getPartners, partnersDefaultQueryKey } from '../PartnerService';

export const usePartners = (): QueryObserverResult<Array<ApiPartner>> => {
    return useQuery<Array<ApiPartner>>({
        queryKey: [partnersDefaultQueryKey],
        queryFn: () => getPartners(),
    });
};
