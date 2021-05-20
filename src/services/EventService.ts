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

export const getEvents = (params: ApiEventParams): Promise<Array<ApiEvent>> =>
    httpClient()
        .get<Array<ApiEvent>>(endpoint, { params })
        .then((response) => response.data);

export const postEvent = (newEvent: ApiEventPost): Promise<ApiEvent> =>
    httpClient()
        .post<ApiEvent>(endpoint, newEvent)
        .then((response) => response.data);

export const deleteEvents = (params: ApiEventParams): Promise<Array<ApiEvent>> =>
    httpClient()
        .delete<Array<ApiEvent>>(endpoint, { params })
        .then((response) => response.data);

export const patchEvent = (updatedEvent: ApiEventPatch): Promise<ApiEvent> =>
    httpClient()
        .patch<ApiEvent>(endpoint, updatedEvent)
        .then((response) => response.data);
