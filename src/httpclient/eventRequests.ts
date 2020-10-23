import { ApiEvent, ApiEventPatch, ApiEventPost } from '../types';
import { apiClient } from './apiClient';

export interface ApiEventParams {
    eventId?: number;
    recurrenceRuleId?: number;
    fromDate?: string;
    toDate?: string;
    stationId?: number;
    partnerId?: number;
}

// First parameter is the query key passed by react-query
export const getEvents = (_: string, params: ApiEventParams, token: string): Promise<Array<ApiEvent>> =>
    apiClient(token)
        .get<Array<ApiEvent>>('/events', { params })
        .then((response) => response.data);

export const postEvent = (newEvent: ApiEventPost, token: string): Promise<ApiEvent> =>
    apiClient(token)
        .post<ApiEvent>('/events', newEvent)
        .then((response) => response.data);

export const deleteEvents = (params: ApiEventParams, token: string): Promise<Array<ApiEvent>> =>
    apiClient(token)
        .delete<Array<ApiEvent>>('/events', { params })
        .then((response) => response.data);

export const patchEvent = (updatedEvent: ApiEventPatch, token: string): Promise<ApiEvent> =>
    apiClient(token)
        .patch<ApiEvent>('/events', updatedEvent)
        .then((response) => response.data);
