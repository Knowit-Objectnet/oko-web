import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiKontakt, kontaktDefaultQueryKey, getKontaktById } from './KontaktService';

export const useKontaktById = (id: string, queryOptions?: UseQueryOptions<ApiKontakt>): UseQueryResult<ApiKontakt> => {
    return useQuery<ApiKontakt>({
        queryKey: [kontaktDefaultQueryKey, id],
        queryFn: () => getKontaktById(id),
        ...queryOptions,
    });
};
