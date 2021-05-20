import { httpClient } from '../services/httpClient';
import { ApiHenteplanUpstream } from './HenteplanService';

interface ApiHentingBase {
    id: string; //UUID
    startTidspunkt: string; //LocalTimeDate
    sluttTidspunkt: string; //LocalTimeDate
    merknad: string | null;
    avlyst: string; //LocalTimeDate
}

export interface ApiHenting extends ApiHentingBase {
    henteplan: ApiHenteplanUpstream; //UUID
}

export interface ApiHentingDownstream extends ApiHentingBase {
    henteplanId: string;
}

export interface ApiHentingParams {
    id?: string;
    before?: string; //LocalTimeDate Henting must be before this
    after?: string; //LocalTimeDate Henting must be after this
    merknad?: string;
    henteplanId?: string;
    avlyst?: boolean;
}

export interface ApiHentingPatch {
    id: string;
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
