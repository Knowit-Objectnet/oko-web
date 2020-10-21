import { ApiEvent, ApiEventPost } from '../types';
import { AxiosResponse } from 'axios';
import { apiClient } from './apiClient';

export interface ApiEventParams {
    fromDate?: string;
    toDate?: string;
    stationId?: number;
    partnerId?: number;
}

// TODO, first parameter is the query key, could be stripped out somewhere else before calling this method
export const getEvents = (_: string, token: string, params: ApiEventParams): Promise<Array<ApiEvent>> =>
    apiClient(token)
        .get<Array<ApiEvent>>('/events', { params: params })
        .then((response) => response.data);

export const postEvent = (newEvent: ApiEventPost, token: string): Promise<ApiEvent> =>
    apiClient(token)
        .post<ApiEventPost, AxiosResponse<ApiEvent>>('/events', newEvent)
        .then((response) => response.data);
