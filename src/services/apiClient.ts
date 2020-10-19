import axios, { AxiosInstance } from 'axios';
import { ApiEvent, apiUrl } from '../types';

export const apiClient = (token?: string): AxiosInstance => {
    // TODO: add all default headers here
    return axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        responseType: 'json',
    });
};

export interface ApiEventParams {
    fromDate?: string;
    toDate?: string;
    stationId?: number;
    partnerId?: number;
}

// TODO, first parameter is the query key, could be stripped out somewhere else before calling this method
export const getEvents = (_: string, token: string, params: ApiEventParams): Promise<ApiEvent> => {
    return apiClient(token)
        .get<ApiEvent>('/events', { params: params })
        .then((response) => {
            return response.data;
        });
};
