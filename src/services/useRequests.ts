import useSWR from 'swr';
import { apiUrl, Request, RequestPost } from '../types';
import { fetcher } from '../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { ApiPostClient } from './ApiPostClient';
import { ApiDeleteClient } from './ApiDeleteClient';

export interface RequestsApiService {
    data?: Array<Request>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<Request>) => void;
    addRequest: (request: RequestPost) => Promise<Request>;
    deleteRequest: () => Promise<boolean>;
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

    const { data, error, isValidating, mutate } = useSWR<Array<Request>>(`${endpoint}?${paramsString}`, fetcher);

    const deleteRequest = async () => {
        if (params.pickupId && params.partnerId) {
            const response = await ApiDeleteClient(`${endpoint}?${paramsString}`, keycloak.token);
            await mutate();
            // TODO: errors may also return a response, so next line is not a good way to handle this
            return response ? true : false;
        } else {
            console.log('Something went wrong');
            throw Error('You cannot call deleteRequest on this hook unless both pickup and partner IDs are defined');
        }
    };

    const addRequest = async (request: RequestPost) => {
        const response = await ApiPostClient<RequestPost, Request>(endpoint, request, keycloak.token);
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
