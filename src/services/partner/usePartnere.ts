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
        // Returning previously fetched data by default, while waiting for a refetch. If it is important
        //  to not use potentially stale data, override `keepPreviousData` by passing false in the params.queryOptions argument
        keepPreviousData: true,
        // Always returning the partners alphabetically sorted. Override this by passing another `select`-callback
        //  in the params.queryOptions argument
        select: (data) => data.sort((partnerA, partnerB) => partnerA.navn.localeCompare(partnerB.navn, 'nb')),
        ...params?.queryOptions,
    });
};
