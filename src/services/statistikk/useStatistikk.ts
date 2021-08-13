import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ApiStatistikk, ApiStatistikkParams, getStatistikk, statistikkDefaultQueryKey } from './StatistikkService';

interface UseStatistikkParams {
    params?: ApiStatistikkParams;
    queryOptions?: UseQueryOptions<Array<ApiStatistikk>>;
}

export const useStatistikk = (params?: UseStatistikkParams): UseQueryResult<Array<ApiStatistikk>> => {
    return useQuery<Array<ApiStatistikk>>({
        queryKey: [statistikkDefaultQueryKey, params?.params],
        queryFn: () => getStatistikk(params?.params),
        ...params?.queryOptions,
    });
};
