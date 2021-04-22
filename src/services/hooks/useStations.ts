import { QueryObserverResult, useQuery } from 'react-query';
import { ApiStation, getStations, stationsDefaultQueryKey } from '../StationService';

export const useStations = (): QueryObserverResult<Array<ApiStation>> => {
    return useQuery<Array<ApiStation>>({
        queryKey: [stationsDefaultQueryKey],
        queryFn: () => getStations(),
    });
};
