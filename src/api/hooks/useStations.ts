import { useKeycloak } from '@react-keycloak/web';
import { useQuery } from 'react-query';
import StationService, { stationsDefaultQueryKey } from '../StationService';
import { ApiStation } from '../../types';

const useStations = () => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiStation>>({
        queryKey: [stationsDefaultQueryKey, keycloak.token],
        queryFn: StationService.getStations,
    });
};

export default useStations;
