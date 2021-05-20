import { httpClient } from '../services/httpClient';

export interface ApiHenting {
    id: string; //UUID
    startTidspunkt: string; //LocalTimeDate
    sluttTidspunkt: string; //LocalTimeDate
    merknad: string | null;
    henteplanId: string; //UUID
    avlyst: string; //LocalTimeDate
}

export interface ApiHentingParams {
    id?: string; //UUID
    before?: string; //LocalTimeDate Henting must be before this
    after?: string; //LocalTimeDate Henting must be after this
    merknad?: string;
    henteplanId?: string;
    avlyst?: boolean;
}

export interface ApiHentingPatch {
    id: string; //UUID
    startTidspunkt?: string; //LocalTimeDate
    sluttTidspunkt?: string; //LocalTimeDate
    merknad?: string;
    avlyst?: string; //LocalTimeDate
}

const hentingEndpoint = '/planlagte-hentinger';
export const hentingDefaultQueryKey = 'getHentinger';

export const getHentinger = (params: ApiHentingParams): Promise<Array<ApiHenting>> =>
    httpClient()
        .get<Array<ApiHenting>>(hentingEndpoint, { params })
        .then((response) => response.data);

export const getHentingById = (hentingId: string): Promise<ApiHenting> =>
    httpClient()
        .get<ApiHenting>(`${hentingEndpoint}/${hentingId}`)
        .then((response) => response.data);

export const deleteHenting = (hentingId: string): Promise<ApiHenting> =>
    httpClient()
        .delete<ApiHenting>(`${hentingEndpoint}/${hentingId}`)
        .then((response) => response.data);

export const patchHenting = (updatedHenting: ApiHentingPatch): Promise<ApiHenting> =>
    httpClient()
        .patch<ApiHenting>(hentingEndpoint, updatedHenting)
        .then((response) => response.data);
