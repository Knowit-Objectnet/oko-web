import useSWR from 'swr';
import { Station, apiUrl, StationRequest } from '../types';
import { fetcher } from '../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { ApiPostClient } from './ApiPostClient';

export interface StationsApiService {
    data?: Array<Station>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<Station>) => void;
    addStation: (station: StationRequest) => Promise<Station>;
}

export const useStations = (): StationsApiService => {
    const [keycloak] = useKeycloak();
    const endpoint = `${apiUrl}/stations`;

    const { data, error, isValidating, mutate } = useSWR<Array<Station>>(endpoint, fetcher);

    const addStation = async (station: StationRequest) => {
        const response = await ApiPostClient<StationRequest, Station>(endpoint, station, keycloak.token);
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
