import { httpClient } from '../services/httpClient';
import { AktorType, PartnerStorrelse, StasjonType } from '../types';

export interface ApiKontakt {
    id: string;
    navn: string;
    telefon: string;
    rolle: string;
}

export interface ApiAktor {
    id: string;
    navn: string;
    kontaktPersoner: Array<ApiKontakt>;
}

export interface ApiStasjon {
    id: string;
    navn: string;
    kontaktPersoner: Array<ApiKontakt>;
    type: StasjonType;
}

export interface ApiStasjonPatch {
    id: string;
    navn?: string;
    type?: StasjonType;
}

export interface ApiStasjonPost {
    navn: string;
    type: StasjonType;
}

export interface ApiStasjonParams {
    id?: string;
    navn?: string;
    type?: StasjonType;
}

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

const aktorEndpoint = '/aktor';
export const aktorDefaultQueryKey = 'findOneAktor';

export const findOneAktor = (aktorId: string): Promise<AktorType> =>
    httpClient()
        .get<AktorType>(`${aktorEndpoint}/${aktorId}`)
        .then((response) => response.data);

const stasjonEndpoint = '/stasjoner';
export const stasjonDefaultQueryKey = 'getStasjoner';

export const getStasjoner = (params: ApiStasjonParams = {}): Promise<Array<ApiStasjon>> =>
    httpClient()
        .get<Array<ApiStasjon>>(stasjonEndpoint, { params })
        .then((response) => response.data);

export const getStasjonById = (stasjonId: string): Promise<ApiStasjon> =>
    httpClient()
        .get<ApiStasjon>(`${stasjonEndpoint}/${stasjonId}`)
        .then((response) => response.data);

export const postStasjon = (newStasjon: ApiStasjonPost): Promise<ApiStasjon> =>
    httpClient()
        .post<ApiStasjon>(stasjonEndpoint, newStasjon)
        .then((response) => response.data);

export const deleteStasjon = (stasjonId: string): Promise<ApiStasjon> =>
    httpClient()
        .delete<ApiStasjon>(`${stasjonEndpoint}/${stasjonId}`)
        .then((response) => response.data);

export const patchStasjon = (updatedStasjon: ApiStasjonPatch): Promise<ApiStasjon> =>
    httpClient()
        .patch<ApiStasjon>(stasjonEndpoint, updatedStasjon)
        .then((response) => response.data);

const partnerEndpoint = '/partnere';
export const partnerDefaultQueryKey = 'getPartnere';

export const getPartnere = (params: ApiPartnerParams = {}): Promise<Array<ApiPartner>> =>
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
