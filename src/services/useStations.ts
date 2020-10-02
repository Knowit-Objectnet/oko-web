import useSWR from 'swr';
import { ApiLocation, apiUrl } from '../types';
import { fetcher } from '../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { ApiPostClient } from './ApiPostClient';

export interface StationsApiService {
    data?: Array<ApiLocation>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<ApiLocation>) => void;
    addStation: (station: ApiLocation) => void;
}

export const useStations = (): StationsApiService => {
    const [keycloak] = useKeycloak();
    const endpoint = `${apiUrl}/stations`;

    const { data, error, isValidating, mutate } = useSWR<Array<ApiLocation>>(endpoint, fetcher);

    const addStation = async (station: ApiLocation) => {
        await ApiPostClient<ApiLocation>(endpoint, station, keycloak.token);
        await mutate();
    };

    return {
        data,
        isValidating,
        error,
        mutate,
        addStation,
    };
};
