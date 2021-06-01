import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiAvtale, ApiAvtaleParams, avtaleDefaultQueryKey, getAvtaler } from './AvtaleService';

export const useAvtaler = (
    params: ApiAvtaleParams = {},
    queryOptions?: UseQueryOptions<Array<ApiAvtale>>,
): UseQueryResult<Array<ApiAvtale>> => {
    return useQuery<Array<ApiAvtale>>({
        queryKey: [avtaleDefaultQueryKey],
        queryFn: () => getAvtaler(params),
        ...queryOptions,
    });
};
