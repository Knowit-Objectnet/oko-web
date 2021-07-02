import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiKategori, ApiKategoriParams, getKategorier, kategoriDefaultQueryKey } from './KategoriService';

interface UseKategorierParams {
    params?: ApiKategoriParams;
    queryOptions?: UseQueryOptions<Array<ApiKategori>>;
}

export const useKategorier = (params?: UseKategorierParams): UseQueryResult<Array<ApiKategori>> => {
    return useQuery<Array<ApiKategori>>({
        // Note: `usePrefetchKategorier` passes `undefined` as the second key, as this is the default `params` value.
        //  If you make changes to the key here, make sure that it is reflected in `usePrefetchKategorier` as well.
        queryKey: [kategoriDefaultQueryKey, params?.params],
        queryFn: () => getKategorier(params?.params),
        ...params?.queryOptions,
    });
};