import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiHenteplan, henteplanDefaultQueryKey, getHenteplanById } from './HenteplanService';

export const useHenteplanById = (
    id: string,
    queryOptions?: UseQueryOptions<ApiHenteplan>,
): UseQueryResult<ApiHenteplan> => {
    return useQuery<ApiHenteplan>({
        queryKey: [henteplanDefaultQueryKey, id],
        queryFn: () => getHenteplanById(id),
        ...queryOptions,
    });
};
