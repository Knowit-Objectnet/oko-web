import { ApiEvent, ApiEventPatch, ApiEventPost } from '../types';
import { httpClient } from './httpClient';

export interface ApiEventParams {
    eventId?: number;
    recurrenceRuleId?: number;
    fromDate?: string;
    toDate?: string;
    stationId?: number;
    partnerId?: number;
}

const endpoint = '/events';
export const eventsDefaultQueryKey = 'getEvents';

export default {
    // First parameter is the query key passed by react-query
    getEvents: (_: string, params: ApiEventParams, token: string): Promise<Array<ApiEvent>> =>
        httpClient(token)
            .get<Array<ApiEvent>>(endpoint, { params })
            .then((response) => response.data),

    addEvent: (newEvent: ApiEventPost, token: string): Promise<ApiEvent> =>
        httpClient(token)
            .post<ApiEvent>(endpoint, newEvent)
            .then((response) => response.data),

    deleteEvents: (params: ApiEventParams, token: string): Promise<Array<ApiEvent>> =>
        httpClient(token)
            .delete<Array<ApiEvent>>(endpoint, { params })
            .then((response) => response.data),

    updateEvent: (updatedEvent: ApiEventPatch, token: string): Promise<ApiEvent> =>
        httpClient(token)
            .patch<ApiEvent>(endpoint, updatedEvent)
            .then((response) => response.data),
};
