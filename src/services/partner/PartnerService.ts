import { extractResponse, httpClient, transformError } from '../httpClient';
import { ApiKontakt } from '../aktor/AktorService';

export type PartnerStorrelse = 'STOR' | 'MIDDELS' | 'LITEN';

export interface ApiPartner {
    id: string;
    navn: string;
    // kontaktPersoner: Array<ApiKontakt>;
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

export const getPartnere = (params: ApiPartnerParams = {}): Promise<Array<ApiPartner>> =>
    httpClient()
        .get<Array<ApiPartner>>(partnerEndpoint, { params })
        .then(extractResponse, transformError);

export const getPartnerById = (partnerId: string): Promise<ApiPartner> =>
    httpClient().get<ApiPartner>(`${partnerEndpoint}/${partnerId}`).then(extractResponse, transformError);

export const postPartner = (newPartner: ApiPartnerPost): Promise<ApiPartner> =>
    httpClient().post<ApiPartner>(partnerEndpoint, newPartner).then(extractResponse, transformError);

export const deletePartner = (partnerId: string): Promise<ApiPartner> =>
    httpClient().delete<ApiPartner>(`${partnerEndpoint}/${partnerId}`).then(extractResponse, transformError);

export const patchPartner = (updatedPartner: ApiPartnerPatch): Promise<ApiPartner> =>
    httpClient().patch<ApiPartner>(partnerEndpoint, updatedPartner).then(extractResponse, transformError);
