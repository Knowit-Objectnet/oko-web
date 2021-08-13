import { extractResponse, httpClient, transformError } from '../httpClient';

export interface ApiKategori {
    id: string;
    navn: string;
    vektkategori: boolean;
}

export interface ApiHentingKategori {
    kategori: ApiKategori;
}

export interface ApiKategoriPatch {
    id: string;
    navn?: string;
    vektkategori?: boolean;
}

export interface ApiKategoriParams {
    id?: string;
    navn?: string;
    vektkategori?: boolean;
}

export interface ApiKategoriPost {
    navn: string;
    vektkategori: boolean;
}

const kategoriEndpoint = '/kategorier';
export const kategoriDefaultQueryKey = 'getKategorier';

export const getKategorier = (params: ApiKategoriParams = {}): Promise<Array<ApiKategori>> =>
    httpClient().get<Array<ApiKategori>>(kategoriEndpoint, { params }).then(extractResponse, transformError);

export const deleteKategori = (kategoriId: string): Promise<ApiKategori> =>
    httpClient().delete<ApiKategori>(`${kategoriEndpoint}/${kategoriId}`).then(extractResponse, transformError);

export const postKategori = (newKategori: ApiKategoriPost): Promise<ApiKategori> =>
    httpClient().post<ApiKategori>(kategoriEndpoint, newKategori).then(extractResponse, transformError);

export const patchKategori = (updatedKategori: ApiKategoriPatch): Promise<ApiKategori> =>
    httpClient().patch<ApiKategori>(kategoriEndpoint, updatedKategori).then(extractResponse, transformError);
