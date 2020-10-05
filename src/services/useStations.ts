import useSWR from 'swr';
import { Station, apiUrl, StationPost } from '../types';
import { fetcher } from '../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { ApiPostClient } from './ApiPostClient';

export interface StationsApiService {
    data?: Array<Station>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<Station>) => void;
    addStation: (station: StationPost) => Promise<Station>;
}

export const useStations = (): StationsApiService => {
    const [keycloak] = useKeycloak();
    const endpoint = `${apiUrl}/stations/`;

    const { data, error, isValidating, mutate } = useSWR<Array<Station>>(endpoint, fetcher);

    const addStation = async (station: StationPost) => {
        const response = await ApiPostClient<StationPost, Station>(endpoint, station, keycloak.token);
        await mutate();
        return response;
    };

    return {
        data,
        isValidating,
        error,
        mutate,
        addStation,
    };
};
