import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiPartner, ApiPartnerParams, getPartnere, partnerDefaultQueryKey } from './PartnerService';

interface UsePartnereParams {
    params?: ApiPartnerParams;
    queryOptions?: UseQueryOptions<Array<ApiPartner>>;
}

export const usePartnere = (params?: UsePartnereParams): UseQueryResult<Array<ApiPartner>> => {
    return useQuery<Array<ApiPartner>>({
        // Note: `usePrefetchPartnere` passes `undefined` as the second key, as this is the default `params` value.
        //  If you make changes to the key here, make sure that it is reflected in `usePrefetchPartnere` as well.
        queryKey: [partnerDefaultQueryKey, params?.params],
        queryFn: () => getPartnere(params?.params),
        ...params?.queryOptions,
    });
};
