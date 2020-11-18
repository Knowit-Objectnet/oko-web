import { httpClient } from './httpClient';
import { ApiPickUp } from './PickUpService';
import { ApiPartner } from './PartnerService';

const endpoint = '/requests';
export const requestsDefaultQueryKey = 'getRequests';

export interface ApiRequest {
    pickup: ApiPickUp;
    partner: ApiPartner;
}

export interface ApiRequestPost {
    pickupId: number;
    partnerId: number;
}

export interface ApiRequestParams {
    pickupId?: number;
    partnerId?: number;
}

// First parameter is the query key passed by react-query
export const getRequests = (_: string, params: ApiRequestParams, token: string): Promise<Array<ApiRequest>> =>
    httpClient(token)
        .get<Array<ApiRequest>>(endpoint, { params })
        .then((response) => response.data);

export const postRequest = (newRequest: ApiRequestPost, token: string): Promise<ApiRequest> =>
    httpClient(token)
        .post<ApiRequest>(endpoint, newRequest)
        .then((response) => response.data);

export const deleteRequest = (params: ApiRequestParams, token: string): Promise<ApiRequest> =>
    httpClient(token)
        .delete<ApiRequest>(endpoint, { params })
        .then((response) => response.data);
