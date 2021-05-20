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

export const getPartners = (): Promise<Array<ApiPartner>> =>
    httpClient()
        .get<Array<ApiPartner>>(endpoint)
        .then((response) => response.data);

export const getPartnerById = (partnerId: number): Promise<ApiPartner> =>
    httpClient()
        .get<ApiPartner>(`${endpoint}/${partnerId}`)
        .then((response) => response.data);

export const postPartner = (newPartner: ApiPartnerPost): Promise<ApiPartner> =>
    httpClient()
        .post<ApiPartner>(endpoint, newPartner)
        .then((response) => response.data);

export const deletePartner = (partnerId: number): Promise<ApiPartner> =>
    httpClient()
        .delete<ApiPartner>(`${endpoint}/${partnerId}`)
        .then((response) => response.data);

export const patchPartner = (updatedPartner: ApiPartnerPatch): Promise<ApiPartner> =>
    httpClient()
        .patch<ApiPartner>(endpoint, updatedPartner)
        .then((response) => response.data);
