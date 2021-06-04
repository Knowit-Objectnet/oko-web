import { httpClient } from '../httpClient';
import { WorkingWeekdays } from './types';

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

export const getStations = (): Promise<Array<ApiStation>> =>
    httpClient()
        .get<Array<ApiStation>>(endpoint)
        .then((response) => response.data);

export const getStationById = (stationId: number): Promise<ApiStation> =>
    httpClient()
        .get<ApiStation>(`${endpoint}/${stationId}`)
        .then((response) => response.data);

export const postStation = (newStation: ApiStationPost): Promise<ApiStation> =>
    httpClient()
        .post<ApiStation>(endpoint, newStation)
        .then((response) => response.data);

export const deleteStation = (stationId: number): Promise<ApiStation> =>
    httpClient()
        .delete<ApiStation>(`${endpoint}/${stationId}`)
        .then((response) => response.data);

export const patchStation = (updatedStation: ApiStationPatch): Promise<ApiStation> =>
    httpClient()
        .patch<ApiStation>(endpoint, updatedStation)
        .then((response) => response.data);
