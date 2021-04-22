import { httpClient } from './httpClient';
import { ApiStation } from './StationService';
import { ApiPartner } from './PartnerService';

const endpoint = '/pickups';
export const pickUpsDefaultQueryKey = 'getPickUps';

export interface ApiPickUp {
    id: number;
    startDateTime: string;
    endDateTime: string;
    description: string;
    station: ApiStation;
    chosenPartner: ApiPartner | null;
}

export interface ApiPickUpPost {
    stationId: number;
    startDateTime: string;
    endDateTime: string;
    description: string;
}

export interface ApiPickUpPatch {
    id: number;
    startDateTime?: string;
    endDateTime?: string;
    description?: string;
    chosenPartnerId?: number;
}

export interface ApiPickUpParams {
    pickUpId?: number;
    stationId?: number;
    partnerId?: number;
    startDateTime?: string;
    endDateTime?: string;
}

export const getPickUps = (params: ApiPickUpParams, token?: string): Promise<Array<ApiPickUp>> =>
    httpClient(token)
        .get<Array<ApiPickUp>>(endpoint, { params })
        .then((response) => response.data);

export const getPickUpById = (pickUpId: number, token?: string): Promise<ApiPickUp> =>
    httpClient(token)
        .get<ApiPickUp>(`${endpoint}/${pickUpId}`)
        .then((response) => response.data);

export const postPickUp = (newPickUp: ApiPickUpPost, token?: string): Promise<ApiPickUp> =>
    httpClient(token)
        .post<ApiPickUp>(endpoint, newPickUp)
        .then((response) => response.data);

export const deletePickUp = (pickUpId: number, token?: string): Promise<ApiPickUp> =>
    httpClient(token)
        .delete<ApiPickUp>(`${endpoint}/${pickUpId}`)
        .then((response) => response.data);

export const patchPickUp = (updatedPickUp: ApiPickUpPatch, token?: string): Promise<ApiPickUp> =>
    httpClient(token)
        .patch<ApiPickUp>(endpoint, updatedPickUp)
        .then((response) => response.data);
