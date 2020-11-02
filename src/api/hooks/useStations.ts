import { useKeycloak } from '@react-keycloak/web';
import { QueryResult, useQuery } from 'react-query';
import { ApiStation, getStations, stationsDefaultQueryKey } from '../StationService';

const useStations = (): QueryResult<Array<ApiStation>> => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiStation>>({
        queryKey: [stationsDefaultQueryKey, keycloak.token],
        queryFn: getStations,
    });
};

export default useStations;
