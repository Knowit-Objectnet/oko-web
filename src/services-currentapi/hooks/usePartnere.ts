import { QueryClient, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiPartner, ApiPartnerParams, getPartnere, partnerDefaultQueryKey } from '../PartnerService';

export const usePartnere = (
    params: ApiPartnerParams = {},
    queryOptions?: UseQueryOptions<Array<ApiPartner>>,
): UseQueryResult<Array<ApiPartner>> => {
    return useQuery<Array<ApiPartner>>({
        queryKey: [partnerDefaultQueryKey, params],
        queryFn: () => getPartnere(params),
        ...queryOptions,
    });
};

export const prefetchPartnere = (queryClient: QueryClient): void => {
    queryClient.prefetchQuery({
        queryKey: [partnerDefaultQueryKey],
        queryFn: () => getPartnere(),
    });
};
