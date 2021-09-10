import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiKategori, getKategoriById, kategoriDefaultQueryKey } from './KategoriService';

export const useKategoriById = (
    id: string,
    queryOptions?: UseQueryOptions<ApiKategori>,
): UseQueryResult<ApiKategori> => {
    return useQuery<ApiKategori>({
        queryKey: [kategoriDefaultQueryKey, id],
        queryFn: () => getKategoriById(id),
        ...queryOptions,
    });
};
