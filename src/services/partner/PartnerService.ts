import { extractResponse, httpClient, transformError } from '../httpClient';
import { ApiKontakt } from '../aktor/AktorService';

export interface ApiPartner {
    id: string;
    navn: string;
    kontaktPersoner: Array<ApiKontakt>;
    ideell: boolean;
}

export interface ApiPartnerPatch {
    id: string;
    navn?: string;
    ideell?: boolean;
}

export interface ApiPartnerPost {
    navn: string;
    ideell: boolean;
}

export interface ApiPartnerParams {
    id?: string;
    navn?: string;
    ideell?: boolean;
}

const partnerEndpoint = '/partnere';
export const partnerDefaultQueryKey = 'getPartnere';

export const getPartnere = (params: ApiPartnerParams = {}): Promise<Array<ApiPartner>> =>
    httpClient().get<Array<ApiPartner>>(partnerEndpoint, { params }).then(extractResponse, transformError);

export const getPartnerById = (partnerId: string): Promise<ApiPartner> =>
    httpClient().get<ApiPartner>(`${partnerEndpoint}/${partnerId}`).then(extractResponse, transformError);

export const postPartner = (newPartner: ApiPartnerPost): Promise<ApiPartner> =>
    httpClient().post<ApiPartner>(partnerEndpoint, newPartner).then(extractResponse, transformError);

export const deletePartner = (partnerId: string): Promise<ApiPartner> =>
    httpClient().delete<ApiPartner>(`${partnerEndpoint}/${partnerId}`).then(extractResponse, transformError);

export const patchPartner = (updatedPartner: ApiPartnerPatch): Promise<ApiPartner> =>
    httpClient().patch<ApiPartner>(partnerEndpoint, updatedPartner).then(extractResponse, transformError);
