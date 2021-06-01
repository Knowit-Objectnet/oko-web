import { httpClient } from '../services/httpClient';
import { StasjonType } from '../types';
import { ApiKontakt } from './AktorService';

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
