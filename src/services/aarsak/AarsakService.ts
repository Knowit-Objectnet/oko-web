import { extractResponse, httpClient, transformError } from '../httpClient';

export type AarsakType = 'PARTNER' | 'STASJON' | 'ALLE';

export interface ApiAarsak {
    id: string;
    beskrivelse: string;
    type: AarsakType;
}

export interface ApiAarsakPost {
    beskrivelse: string;
    type?: AarsakType;
}

export interface ApiAarsakPatch {
    id: string;
    beskrivelse?: string;
    type?: AarsakType;
}

export interface ApiAarsakParams {
    id?: string;
    beskrivelse?: string;
    type?: AarsakType;
}

const aarsakEndpoint = '/aarsak';
export const aarsakDefaultQueryKey = 'findOneAarsak';

export const findOneAarsak = (aarsakId: string): Promise<ApiAarsak> =>
    httpClient().get<ApiAarsak>(`${aarsakEndpoint}/${aarsakId}`).then(extractResponse, transformError);

export const findAarsak = (params: ApiAarsakParams = {}): Promise<Array<ApiAarsak>> =>
    httpClient().get<Array<ApiAarsak>>(aarsakEndpoint, { params }).then(extractResponse, transformError);

export const postAarsak = (newAarsak: ApiAarsakPost): Promise<ApiAarsak> =>
    httpClient().post<ApiAarsak>(aarsakEndpoint, newAarsak).then(extractResponse, transformError);

export const patchAarsak = (updatedAarsak: ApiAarsakPatch): Promise<ApiAarsak> =>
    httpClient().patch<ApiAarsak>(aarsakEndpoint, updatedAarsak).then(extractResponse, transformError);

export const deleteAarsak = (aarsakId: string): Promise<ApiAarsak> =>
    httpClient().delete<ApiAarsak>(`${aarsakEndpoint}/${aarsakId}`).then(extractResponse, transformError);
