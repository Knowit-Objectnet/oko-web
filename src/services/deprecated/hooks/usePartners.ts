import { QueryClient, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiPartner, getPartners, partnersDefaultQueryKey } from '../PartnerService';

export const usePartners = (queryOptions?: UseQueryOptions<Array<ApiPartner>>): UseQueryResult<Array<ApiPartner>> => {
    return useQuery<Array<ApiPartner>>({
        queryKey: [partnersDefaultQueryKey],
        queryFn: () => getPartners(),
        ...queryOptions,
    });
};

export const prefetchPartners = (queryClient: QueryClient): void => {
    queryClient.prefetchQuery({
        queryKey: [partnersDefaultQueryKey],
        queryFn: () => getPartners(),
    });
};
