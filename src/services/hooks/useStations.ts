import { QueryClient, QueryObserverResult, useQuery, useQueryClient } from 'react-query';
import { ApiStation, getStations, stationsDefaultQueryKey } from '../StationService';

export const useStations = (): QueryObserverResult<Array<ApiStation>> => {
    return useQuery<Array<ApiStation>>({
        queryKey: [stationsDefaultQueryKey],
        queryFn: () => getStations(),
    });
};

export const prefetchStations = (queryClient: QueryClient): void => {
    queryClient.prefetchQuery({
        queryKey: [stationsDefaultQueryKey],
        queryFn: () => getStations(),
    });
};
