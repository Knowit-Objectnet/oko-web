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

// First parameter is the query key passed by react-query
export const getStations = (_: string, token: string): Promise<Array<ApiStation>> =>
    httpClient(token)
        .get<Array<ApiStation>>(endpoint)
        .then((response) => response.data);

// First parameter is the query key passed by react-query
export const getStationById = (_: string, stationId: number, token: string): Promise<ApiStation> =>
    httpClient(token)
        .get<ApiStation>(`${endpoint}/${stationId}`)
        .then((response) => response.data);

export const postStation = (newStation: ApiStationPost, token: string): Promise<ApiStation> =>
    httpClient(token)
        .post<ApiStation>(endpoint, newStation)
        .then((response) => response.data);

export const deleteStation = (stationId: number, token: string): Promise<ApiStation> =>
    httpClient(token)
        .delete<ApiStation>(`${endpoint}/${stationId}`)
        .then((response) => response.data);

export const patchStation = (updatedStation: ApiStationPatch, token: string): Promise<ApiStation> =>
    httpClient(token)
        .patch<ApiStation>(endpoint, updatedStation)
        .then((response) => response.data);
