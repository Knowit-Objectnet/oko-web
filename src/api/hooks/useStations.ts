import { useKeycloak } from '@react-keycloak/web';
import { useQuery } from 'react-query';
import { ApiStation, getStations, stationsDefaultQueryKey } from '../StationService';

const useStations = () => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiStation>>({
        queryKey: [stationsDefaultQueryKey, keycloak.token],
        queryFn: getStations,
    });
};

export default useStations;
