import { httpClient } from './httpClient';
import { WorkingWeekdays } from '../types';
import { ApiStation } from './StationService';
import { ApiPartner } from './PartnerService';

export interface ApiEvent {
    id: number;
    startDateTime: string;
    endDateTime: string;
    station: ApiStation;
    partner: ApiPartner;
    recurrenceRule: ApiRecurrenceRule | null;
}

export interface ApiEventPost {
    startDateTime: string;
    endDateTime: string;
    stationId: number;
    partnerId: number;
    recurrenceRule?: ApiRecurrenceRulePost;
}

export interface ApiEventPatch {
    id: number;
    startDateTime?: string;
    endDateTime?: string;
}

export interface ApiRecurrenceRule {
    id: number;
    until: string;
    days: Array<WorkingWeekdays>;
    interval: number;
    count: number | null;
}

export interface ApiRecurrenceRulePost {
    until: string;
    days: Array<WorkingWeekdays>;
    interval?: number;
    count?: number;
}

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

export const getEvents = (params: ApiEventParams, token: string): Promise<Array<ApiEvent>> =>
    httpClient(token)
        .get<Array<ApiEvent>>(endpoint, { params })
        .then((response) => response.data);

export const postEvent = (newEvent: ApiEventPost, token: string): Promise<ApiEvent> =>
    httpClient(token)
        .post<ApiEvent>(endpoint, newEvent)
        .then((response) => response.data);

export const deleteEvents = (params: ApiEventParams, token: string): Promise<Array<ApiEvent>> =>
    httpClient(token)
        .delete<Array<ApiEvent>>(endpoint, { params })
        .then((response) => response.data);

export const patchEvent = (updatedEvent: ApiEventPatch, token: string): Promise<ApiEvent> =>
    httpClient(token)
        .patch<ApiEvent>(endpoint, updatedEvent)
        .then((response) => response.data);
