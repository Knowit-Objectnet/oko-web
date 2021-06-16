import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiKontakt, ApiKontaktParams, kontaktDefaultQueryKey, getKontakter } from './KontaktService';

export const useKontakter = (
    params?: ApiKontaktParams,
    queryOptions?: UseQueryOptions<Array<ApiKontakt>>,
): UseQueryResult<Array<ApiKontakt>> => {
    return useQuery<Array<ApiKontakt>>({
        queryKey: [kontaktDefaultQueryKey, params],
        queryFn: () => getKontakter(params),
        ...queryOptions,
    });
};
