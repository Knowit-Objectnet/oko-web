import { extractResponse, httpClient, transformError } from '../services/httpClient';
import { ApiKontakt } from './AktorService';

export type StasjonType = 'GJENBRUK' | 'MINI';

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
const stasjonEndpoint = '/stasjoner';
export const stasjonDefaultQueryKey = 'getStasjoner';

export const getStasjoner = (params: ApiStasjonParams = {}): Promise<Array<ApiStasjon>> =>
    httpClient()
        .get<Array<ApiStasjon>>(stasjonEndpoint, { params })
        .then(extractResponse, transformError);

export const getStasjonById = (stasjonId: string): Promise<ApiStasjon> =>
    httpClient().get<ApiStasjon>(`${stasjonEndpoint}/${stasjonId}`).then(extractResponse, transformError);

export const postStasjon = (newStasjon: ApiStasjonPost): Promise<ApiStasjon> =>
    httpClient().post<ApiStasjon>(stasjonEndpoint, newStasjon).then(extractResponse, transformError);

export const deleteStasjon = (stasjonId: string): Promise<ApiStasjon> =>
    httpClient().delete<ApiStasjon>(`${stasjonEndpoint}/${stasjonId}`).then(extractResponse, transformError);

export const patchStasjon = (updatedStasjon: ApiStasjonPatch): Promise<ApiStasjon> =>
    httpClient().patch<ApiStasjon>(stasjonEndpoint, updatedStasjon).then(extractResponse, transformError);
