import { httpClient } from '../services/httpClient';
import { PartnerStorrelse } from '../types';
import { ApiKontakt } from './AktorService';

export interface ApiPartner {
    id: string;
    navn: string;
    kontaktPersoner: Array<ApiKontakt>;
    storrelse: PartnerStorrelse;
    ideell: boolean;
}

export interface ApiPartnerPatch {
    id: string;
    navn?: string;
    storrelse?: PartnerStorrelse;
    ideell?: boolean;
}

export interface ApiPartnerPost {
    navn: string;
    storrelse: PartnerStorrelse;
    ideell: boolean;
}

export interface ApiPartnerParams {
    id?: string;
    navn?: string;
    storrelse?: PartnerStorrelse;
    ideell?: boolean;
}

const partnerEndpoint = '/partnere';
export const partnerDefaultQueryKey = 'getPartnere';

export const getPartnere = (params: ApiPartnerParams): Promise<Array<ApiPartner>> =>
    httpClient()
        .get<Array<ApiPartner>>(partnerEndpoint, { params })
        .then((response) => response.data);

export const getPartnerById = (partnerId: string): Promise<ApiPartner> =>
    httpClient()
        .get<ApiPartner>(`${partnerEndpoint}/${partnerId}`)
        .then((response) => response.data);

export const postPartner = (newPartner: ApiPartnerPost): Promise<ApiPartner> =>
    httpClient()
        .post<ApiPartner>(partnerEndpoint, newPartner)
        .then((response) => response.data);

export const deletePartner = (partnerId: string): Promise<ApiPartner> =>
    httpClient()
        .delete<ApiPartner>(`${partnerEndpoint}/${partnerId}`)
        .then((response) => response.data);

export const patchPartner = (updatedPartner: ApiPartnerPatch): Promise<ApiPartner> =>
    httpClient()
        .patch<ApiPartner>(partnerEndpoint, updatedPartner)
        .then((response) => response.data);
