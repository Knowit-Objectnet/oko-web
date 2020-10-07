import useSWR from 'swr';
import { ApiEvent, ApiEventPatch, ApiEventPost, apiUrl } from '../types';
import { fetcher } from '../utils/fetcher';
import { apiPost } from './apiPost';
import { useKeycloak } from '@react-keycloak/web';
import { apiPatch } from './apiPatch';
import { apiDelete } from './apiDelete';

export interface EventApiService {
    data?: Array<ApiEvent>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<ApiEvent>, shouldRevalidate?: boolean) => void;
    addEvent: (event: ApiEventPost) => Promise<ApiEvent>;
    updateEvent: (event: ApiEventPatch) => Promise<ApiEvent>;
    deleteEvent: (eventId: number) => void;
}

export interface ApiEventParams {
    fromDate?: string;
    toDate?: string;
    stationId?: number;
    partnerId?: number;
}

export const useEvents = (params?: ApiEventParams): EventApiService => {
    const [keycloak] = useKeycloak();
    const endpoint = `${apiUrl}/events/`;

    // TODO: not necessary when using axios (can pass params object to .get-method)
    let paramsString = '';
    if (params) {
        paramsString = Object.keys(params)
            .map((key) => `${key}=${params[key as keyof ApiEventParams]}`)
            .join('&');
    }

    const { data, error, isValidating, mutate } = useSWR<Array<ApiEvent>>(`${endpoint}?${paramsString}`, fetcher);

    const addEvent = async (event: ApiEventPost) => {
        const response = await apiPost<ApiEventPost, ApiEvent>(endpoint, event, keycloak.token);
        await mutate();
        return response;
    };

    const updateEvent = async (event: ApiEventPatch) => {
        const response = await apiPatch<ApiEventPatch, ApiEvent>(endpoint, event, keycloak.token);
        await mutate();
        return response;
    };

    const deleteEvent = async (eventId: number) => {
        await apiDelete(`${endpoint}?eventId=${eventId}`, keycloak.token);
        await mutate();
    };

    return {
        data,
        isValidating,
        error,
        mutate,
        addEvent,
        updateEvent,
        deleteEvent,
    };
};
