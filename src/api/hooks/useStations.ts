import { useKeycloak } from '@react-keycloak/web';
import { QueryObserverResult, useQuery } from 'react-query';
import { ApiStation, getStations, stationsDefaultQueryKey } from '../StationService';

export const useStations = (): QueryObserverResult<Array<ApiStation>> => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiStation>>({
        queryKey: [stationsDefaultQueryKey],
        queryFn: () => getStations(keycloak.token),
    });
};
