import { httpClient } from './httpClient';

const endpoint = '/partners';
export const partnersDefaultQueryKey = 'getPartners';

export interface ApiPartner {
    id: number;
    name: string;
    description: string;
    phone: string;
    email: string;
}

export interface ApiPartnerPost {
    name: string;
    description?: string;
    phone?: string;
    email?: string;
}

export interface ApiPartnerPatch {
    id: number;
    name?: string;
    description?: string;
    phone?: string;
    email?: string;
}

export const getPartners = (token: string): Promise<Array<ApiPartner>> =>
    httpClient(token)
        .get<Array<ApiPartner>>(endpoint)
        .then((response) => response.data);

export const getPartnerById = (partnerId: number, token: string): Promise<ApiPartner> =>
    httpClient(token)
        .get<ApiPartner>(`${endpoint}/${partnerId}`)
        .then((response) => response.data);

export const postPartner = (newPartner: ApiPartnerPost, token: string): Promise<ApiPartner> =>
    httpClient(token)
        .post<ApiPartner>(endpoint, newPartner)
        .then((response) => response.data);

export const deletePartner = (partnerId: number, token: string): Promise<ApiPartner> =>
    httpClient(token)
        .delete<ApiPartner>(`${endpoint}/${partnerId}`)
        .then((response) => response.data);

export const patchPartner = (updatedPartner: ApiPartnerPatch, token: string): Promise<ApiPartner> =>
    httpClient(token)
        .patch<ApiPartner>(endpoint, updatedPartner)
        .then((response) => response.data);
