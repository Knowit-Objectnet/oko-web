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

export const getRequests = (params: ApiRequestParams, token?: string): Promise<Array<ApiRequest>> =>
    httpClient(token)
        .get<Array<ApiRequest>>(endpoint, { params })
        .then((response) => response.data);

export const postRequest = (newRequest: ApiRequestPost, token?: string): Promise<ApiRequest> =>
    httpClient(token)
        .post<ApiRequest>(endpoint, newRequest)
        .then((response) => response.data);

export const deleteRequest = (params: ApiRequestParams, token?: string): Promise<number> =>
    httpClient(token)
        .delete<number>(endpoint, { params })
        .then((response) => response.data);
