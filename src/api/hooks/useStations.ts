import { useKeycloak } from '@react-keycloak/web';
import { useQuery } from 'react-query';
import StationService, { ApiStation, stationsDefaultQueryKey } from '../StationService';

const useStations = () => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiStation>>({
        queryKey: [stationsDefaultQueryKey, keycloak.token],
        queryFn: StationService.getStations,
    });
};

export default useStations;
