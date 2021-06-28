import { extractResponse, httpClient, transformError } from '../httpClient';

export interface ApiKategori {
    id: string;
    navn: string;
}

export interface ApiKategoriParams {
    id?: string;
}

export interface ApiKategoriPost {
    navn: string;
}

const kategoriEndpoint = '/kategorier';
export const kategoriDefaultQueryKey = 'getKategorier';

export const getKategorier = (params: ApiKategoriParams = {}): Promise<Array<ApiKategori>> =>
    httpClient().get<Array<ApiKategori>>(kategoriEndpoint, { params }).then(extractResponse, transformError);

export const deleteKategori = (kategoriId: string): Promise<ApiKategori> =>
    httpClient().delete<ApiKategori>(`${kategoriEndpoint}/${kategoriId}`).then(extractResponse, transformError);

export const postKategori = (newKategori: ApiKategoriPost): Promise<ApiKategori> =>
    httpClient().post<ApiKategori>(kategoriEndpoint, newKategori).then(extractResponse, transformError);
