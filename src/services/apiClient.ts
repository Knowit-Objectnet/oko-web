import axios, { AxiosInstance } from 'axios';
import { ApiEvent, apiUrl } from '../types';

export const apiClient = (): AxiosInstance => {
    return axios.create({
        baseURL: apiUrl,
    });
};

export interface ApiEventParams {
    fromDate?: string;
    toDate?: string;
    stationId?: number;
    partnerId?: number;
}

// TODO, first parameter is the query key, could be stripped out somewhere else before calling this method
export const getEvents = (_: string, params: ApiEventParams): Promise<ApiEvent> => {
    return apiClient()
        .get<ApiEvent>('/events/', { params: params })
        .then((response) => response.data);
};
