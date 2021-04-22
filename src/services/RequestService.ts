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

export const getRequests = (params: ApiRequestParams): Promise<Array<ApiRequest>> =>
    httpClient()
        .get<Array<ApiRequest>>(endpoint, { params })
        .then((response) => response.data);

export const postRequest = (newRequest: ApiRequestPost): Promise<ApiRequest> =>
    httpClient()
        .post<ApiRequest>(endpoint, newRequest)
        .then((response) => response.data);

export const deleteRequest = (params: ApiRequestParams): Promise<number> =>
    httpClient()
        .delete<number>(endpoint, { params })
        .then((response) => response.data);
