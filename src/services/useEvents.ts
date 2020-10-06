import useSWR from 'swr';
import { ApiEvent, ApiEventPost, apiUrl } from '../types';
import { fetcher } from '../utils/fetcher';
import { ApiPostClient } from './ApiPostClient';
import { useKeycloak } from '@react-keycloak/web';

export interface EventApiService {
    data?: ApiEvent;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: ApiEvent) => void;
    addEvent: (event: ApiEventPost) => Promise<ApiEvent>;
}

export const useEvents = (): EventApiService => {
    const [keycloak] = useKeycloak();
    const endpoint = `${apiUrl}/events/`;

    const { data, error, isValidating, mutate } = useSWR<ApiEvent>(endpoint, fetcher);

    const addEvent = async (event: ApiEventPost) => {
        const response = await ApiPostClient<ApiEventPost, ApiEvent>(endpoint, event, keycloak.token);
        await mutate();
        return response;
    };

    return {
        data,
        isValidating,
        error,
        mutate,
        addEvent,
    };
};
