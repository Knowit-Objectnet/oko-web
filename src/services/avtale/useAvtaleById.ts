import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiAvtale, avtaleDefaultQueryKey, getAvtaleById } from './AvtaleService';

export const useAvtaleById = (id: string, queryOptions?: UseQueryOptions<ApiAvtale>): UseQueryResult<ApiAvtale> => {
    return useQuery<ApiAvtale>({
        queryKey: [avtaleDefaultQueryKey, id],
        queryFn: () => getAvtaleById(id),
        ...queryOptions,
    });
};
