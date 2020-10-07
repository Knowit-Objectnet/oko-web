import useSWR from 'swr';
import { apiUrl, Request, RequestPost } from '../types';
import { fetcher } from '../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { apiPost } from './apiPost';
import { apiDelete } from './apiDelete';

export interface RequestsApiService {
    data?: Array<Request>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<Request>) => void;
    addRequest: (request: RequestPost) => Promise<Request>;
    deleteRequest: (pickupId: number, partnerId: number) => void;
}

export interface ApiRequestParams {
    pickupId: number;
    partnerId?: number;
}

export const useRequests = (params: ApiRequestParams): RequestsApiService => {
    const [keycloak] = useKeycloak();

    const paramsString: string = Object.keys(params)
        .map((key) => `${key}=${params[key as keyof ApiRequestParams]}`)
        .join('&');

    const endpoint = `${apiUrl}/requests/`;

    const { data, error, isValidating, mutate } = useSWR<Array<Request>>(
        [`${endpoint}?${paramsString}`, keycloak.token],
        fetcher,
    );

    const deleteRequest = async (pickupId: number, partnerId: number) => {
        await apiDelete(`${endpoint}?pickupId=${pickupId}&partnerId=${partnerId}`, keycloak.token);
        await mutate();
        // TODO: should this method return some response?
    };

    const addRequest = async (request: RequestPost) => {
        const response = await apiPost<RequestPost, Request>(endpoint, request, keycloak.token);
        await mutate();
        return response;
    };

    return {
        data,
        isValidating,
        error,
        mutate,
        addRequest,
        deleteRequest,
    };
};
