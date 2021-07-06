import { extractResponse, httpClient, transformError } from '../httpClient';
import { ApiKategori } from '../kategori/KategoriService';
import { ApiUtlysning } from '../utlysning/UtlysningService';

export interface ApiEkstraHenting {
    id: string; //UUID
    startTidspunkt: string; //LocalTimeDate
    sluttTidspunkt: string; //LocalTimeDate
    merknad: string | null;
    aktorNavn: string;
    stasjonId: string; //UUID
    stasjonNavn: string;
    godkjentUtlysning: ApiUtlysning | null;
    kategorier: ApiEkstraHentingKategori[];
    utlysninger: ApiUtlysning[];
}

export interface ApiEkstraHentingParams {
    id?: string; //UUID
    before?: string; //LocalTimeDate Henting must be before this
    after?: string; //LocalTimeDate Henting must be after this
    merknad?: string;
    stasjonId?: string;
}

export interface ApiEkstraHentingPatch {
    id: string; //UUID
    startTidspunkt?: string; //LocalTimeDate
    sluttTidspunkt?: string; //LocalTimeDate
    merknad?: string;
    kategorier?: ApiEkstraHentingKategoriPost[];
}

export interface ApiEkstraHentingPost {
    startTidspunkt?: string; //LocalTimeDate
    sluttTidspunkt?: string; //LocalTimeDate
    merknad?: string;
    stasjonId: string; //UUID
    kategorier?: ApiEkstraHentingKategoriPost[];
    partnere?: string[];
}

export interface ApiEkstraHentingKategori {
    id: string;
    ekstraHentingId: string;
    kategoriId: string;
    kategori: ApiKategori | null;
    mengde: number;
}

export interface ApiEkstraHentingKategoriPost {
    kategoriId: string;
    mengde?: number;
}

const hentingEndpoint = '/ekstra-hentinger';
export const ekstraHentingDefaultQueryKey = 'getEkstraHentinger';

export const getEkstraHentinger = (params: ApiEkstraHentingParams = {}): Promise<Array<ApiEkstraHenting>> =>
    httpClient().get<Array<ApiEkstraHenting>>(hentingEndpoint, { params }).then(extractResponse, transformError);

export const getEkstraHentingerWithUtlysning = (
    params: ApiEkstraHentingParams = {},
): Promise<Array<ApiEkstraHenting>> =>
    httpClient()
        .get<Array<ApiEkstraHenting>>(`${hentingEndpoint}/med-utlysning`, { params })
        .then(extractResponse, transformError);

export const getEkstraHentingById = (hentingId: string): Promise<ApiEkstraHenting> =>
    httpClient().get<ApiEkstraHenting>(`${hentingEndpoint}/${hentingId}`).then(extractResponse, transformError);

export const deleteEkstraHenting = (hentingId: string): Promise<ApiEkstraHenting> =>
    httpClient().delete<ApiEkstraHenting>(`${hentingEndpoint}/${hentingId}`).then(extractResponse, transformError);

export const patchEkstraHenting = (updatedHenting: ApiEkstraHentingPatch): Promise<ApiEkstraHenting> =>
    httpClient().patch<ApiEkstraHenting>(hentingEndpoint, updatedHenting).then(extractResponse, transformError);

export const postEkstraHenting = (newHenting: ApiEkstraHentingPost): Promise<ApiEkstraHenting> =>
    httpClient().post<ApiEkstraHenting>(hentingEndpoint, newHenting).then(extractResponse, transformError);
