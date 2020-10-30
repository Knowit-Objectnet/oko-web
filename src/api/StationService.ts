import { httpClient } from './httpClient';
import { WorkingWeekdays } from '../types';

const endpoint = '/stations';
export const stationsDefaultQueryKey = 'getStations';

export type StationOpeningHours = {
    [key in WorkingWeekdays]?: [string, string];
};

export interface ApiStation {
    id: number;
    name: string;
    hours: StationOpeningHours;
}

export interface ApiStationPost {
    name: string;
    hours?: StationOpeningHours;
}

export interface ApiStationPatch {
    id: number;
    name?: string;
    hours?: StationOpeningHours;
}

export default {
    // First parameter is the query key passed by react-query
    getStations: (_: string, token: string): Promise<Array<ApiStation>> =>
        httpClient(token)
            .get<Array<ApiStation>>(endpoint)
            .then((response) => response.data),

    // First parameter is the query key passed by react-query
    getStationById: (_: string, stationId: number, token: string): Promise<ApiStation> =>
        httpClient(token)
            .get<ApiStation>(`${endpoint}/${stationId}`)
            .then((response) => response.data),

    addStation: (newStation: ApiStationPost, token: string): Promise<ApiStation> =>
        httpClient(token)
            .post<ApiStation>(endpoint, newStation)
            .then((response) => response.data),

    deleteStation: (stationId: number, token: string): Promise<ApiStation> =>
        httpClient(token)
            .delete<ApiStation>(`${endpoint}/${stationId}`)
            .then((response) => response.data),

    updateStation: (updatedStation: ApiStationPatch, token: string): Promise<ApiStation> =>
        httpClient(token)
            .patch<ApiStation>(endpoint, updatedStation)
            .then((response) => response.data),
};
