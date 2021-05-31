import { QueryClient, QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import { ApiPartner, ApiPartnerParams, getPartnere, partnerDefaultQueryKey } from '../AktorService';

export const usePartnere = (
    params: ApiPartnerParams = {},
    queryOptions?: UseQueryOptions<Array<ApiPartner>>,
): QueryObserverResult<Array<ApiPartner>> => {
    return useQuery<Array<ApiPartner>>({
        queryKey: [partnerDefaultQueryKey],
        queryFn: () => getPartnere(params),
    });
};

export const prefetchPartnere = (queryClient: QueryClient): void => {
    queryClient.prefetchQuery({
        queryKey: [partnerDefaultQueryKey],
        queryFn: () => getPartnere(),
    });
};
