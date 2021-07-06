import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { aktorDefaultQueryKey, ApiAktor, findOneAktor } from './AktorService';

export const useAktorById = (aktorId: string, queryOptions?: UseQueryOptions<ApiAktor>): UseQueryResult<ApiAktor> => {
    return useQuery<ApiAktor>({
        queryKey: [aktorDefaultQueryKey, aktorId],
        queryFn: () => findOneAktor(aktorId),
        ...queryOptions,
    });
};
