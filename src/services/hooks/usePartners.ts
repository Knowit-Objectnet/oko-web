import { QueryClient, QueryObserverResult, useQuery } from 'react-query';
import { ApiPartner, getPartners, partnersDefaultQueryKey } from '../PartnerService';

export const usePartners = (): QueryObserverResult<Array<ApiPartner>> => {
    return useQuery<Array<ApiPartner>>({
        queryKey: [partnersDefaultQueryKey],
        queryFn: () => getPartners(),
    });
};

export const prefetchPartners = (queryClient: QueryClient): void => {
    queryClient.prefetchQuery({
        queryKey: [partnersDefaultQueryKey],
        queryFn: () => getPartners(),
    });
};
