import { partition } from 'lodash';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiKategori, ApiKategoriParams, getKategorier, kategoriDefaultQueryKey } from './KategoriService';

export const useKategorier = (
    params?: ApiKategoriParams,
    queryOptions?: UseQueryOptions<Array<ApiKategori>>,
): UseQueryResult<Array<ApiKategori>> => {
    return useQuery<Array<ApiKategori>>({
        // Note: `usePrefetchKategorier` passes `undefined` as the second key, as this is the default `params` value.
        //  If you make changes to the key here, make sure that it is reflected in `usePrefetchKategorier` as well.
        queryKey: [kategoriDefaultQueryKey, params],
        queryFn: () => getKategorier(params),
        // Returning previously fetched data by default, while waiting for a refetch. If it is important
        //  to not use potentially stale data, override `keepPreviousData` by passing false in the params.queryOptions argument
        keepPreviousData: true,
        select: (kategorier: Array<ApiKategori>): Array<ApiKategori> => {
            const sortedKategorier = kategorier.sort((kategoriA, kategoriB) =>
                kategoriA.navn.localeCompare(kategoriB.navn, 'nb'),
            );
            const [diverseKategori, alleAndreKategorier] = partition<ApiKategori>(
                sortedKategorier,
                (kategori) => kategori.navn === 'Diverse',
            );
            return alleAndreKategorier.concat(diverseKategori);
        },
        ...queryOptions,
    });
};
