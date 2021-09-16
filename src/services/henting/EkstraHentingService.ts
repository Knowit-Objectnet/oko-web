import { extractResponse, httpClient, transformError } from '../httpClient';
import { ApiHentingKategori, ApiKategori } from '../kategori/KategoriService';
import { ApiUtlysning } from '../utlysning/UtlysningService';
import { ApiVektregistrering } from '../vektregistrering/VektregistreringService';
import { ApiHenting } from './HentingService';

export interface ApiEkstraHenting extends ApiHenting {
    id: string; //UUID
    startTidspunkt: string; //LocalTimeDate
    sluttTidspunkt: string; //LocalTimeDate
    beskrivelse: string | null;
    stasjonId: string; //UUID
    stasjonNavn: string;
    godkjentUtlysning: ApiUtlysning | null;
    kategorier: Array<ApiEkstraHentingKategori>;
    utlysninger: Array<ApiUtlysning>;
    vektregistreringer: Array<ApiVektregistrering>;
}

export interface ApiEkstraHentingParams {
    id?: string; //UUID
    before?: string; //LocalTimeDate Henting must be before this
    after?: string; //LocalTimeDate Henting must be after this
    beskrivelse?: string;
    stasjonId?: string;
}

export interface ApiEkstraHentingPatch {
    id: string; //UUID
    startTidspunkt?: string; //LocalTimeDate
    sluttTidspunkt?: string; //LocalTimeDate
    beskrivelse?: string;
    kategorier?: Array<ApiEkstraHentingKategoriPost>;
}

export interface ApiEkstraHentingPost {
    startTidspunkt?: string; //LocalTimeDate
    sluttTidspunkt?: string; //LocalTimeDate
    beskrivelse: string;
    stasjonId: string; //UUID
    kategorier?: Array<ApiEkstraHentingKategoriPost>;
    partnere?: Array<string>;
}

export interface ApiEkstraHentingKategori extends ApiHentingKategori {
    id: string;
    ekstraHentingId: string;
    kategoriId: string;
    kategori: ApiKategori;
    mengde: number;
}

export interface ApiEkstraHentingKategoriPost {
    kategoriId: string;
    mengde?: number;
}

const hentingEndpoint = '/ekstra-hentinger';
export const ekstraHentingDefaultQueryKey = 'getEkstraHentinger';

export const getEkstraHentinger = (params: ApiEkstraHentingParams = {}): Promise<Array<ApiEkstraHenting>> =>
    httpClient().get<Array<ApiEkstraHenting>>(`${hentingEndpoint}`, { params }).then(extractResponse, transformError);

export const getEkstraHentingById = (hentingId: string): Promise<ApiEkstraHenting> =>
    httpClient().get<ApiEkstraHenting>(`${hentingEndpoint}/${hentingId}`).then(extractResponse, transformError);

export const deleteEkstraHenting = (hentingId: string): Promise<ApiEkstraHenting> =>
    httpClient().delete<ApiEkstraHenting>(`${hentingEndpoint}/${hentingId}`).then(extractResponse, transformError);

export const patchEkstraHenting = (updatedHenting: ApiEkstraHentingPatch): Promise<ApiEkstraHenting> =>
    httpClient().patch<ApiEkstraHenting>(hentingEndpoint, updatedHenting).then(extractResponse, transformError);

export const postEkstraHenting = (newHenting: ApiEkstraHentingPost): Promise<ApiEkstraHenting> =>
    httpClient().post<ApiEkstraHenting>(hentingEndpoint, newHenting).then(extractResponse, transformError);
