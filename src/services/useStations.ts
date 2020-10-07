import useSWR from 'swr';
import { apiUrl, Station, StationPost } from '../types';
import { fetcher } from '../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { apiPost } from './apiPost';
import { apiDelete } from './apiDelete';

export interface StationsApiService {
    data?: Array<Station>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<Station>) => void;
    addStation: (station: StationPost) => Promise<Station>;
    deleteStation: (stationId: number) => void;
}

export const useStations = (): StationsApiService => {
    const [keycloak] = useKeycloak();
    const endpoint = `${apiUrl}/stations/`;

    const { data, error, isValidating, mutate } = useSWR<Array<Station>>([endpoint, keycloak.token], fetcher);

    const addStation = async (station: StationPost) => {
        const response = await apiPost<StationPost, Station>(endpoint, station, keycloak.token);
        await mutate();
        return response;
    };

    const deleteStation = async (stationId: number) => {
        await apiDelete(`${endpoint}/${stationId}`, keycloak.token);
        await mutate();
        // TODO: should this method return some response?
    };

    return {
        data,
        isValidating,
        error,
        mutate,
        addStation,
        deleteStation,
    };
};
