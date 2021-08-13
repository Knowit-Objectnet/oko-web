import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import {
    ApiVektregistrering,
    ApiVektregistreringParams,
    getVektregistreringer,
    vektregistreringDefaultQueryKey,
} from './VektregistreringService';

interface UseVektregistreringParams {
    params?: ApiVektregistreringParams;
    queryOptions?: UseQueryOptions<Array<ApiVektregistrering>>;
}

export const useVektregistrering = (params?: UseVektregistreringParams): UseQueryResult<Array<ApiVektregistrering>> => {
    return useQuery<Array<ApiVektregistrering>>({
        // Note: `usePrefetchKategorier` passes `undefined` as the second key, as this is the default `params` value.
        //  If you make changes to the key here, make sure that it is reflected in `usePrefetchKategorier` as well.
        queryKey: [vektregistreringDefaultQueryKey, params?.params],
        queryFn: () => getVektregistreringer(params?.params),
        ...params?.queryOptions,
    });
};
