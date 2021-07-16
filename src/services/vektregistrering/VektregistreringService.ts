import { extractResponse, httpClient, transformError } from '../httpClient';

export interface ApiVektregistrering {
    id: string; // uuid
    hentingId: string; // uuid
    kategoriId: string; // uuid
    vekt: number;
    registreringsDato: string; //LocalTimeDate
}

// IKKE STØTTE FOR UPDATE I BACKEND
export interface ApiVektregistreringPatch {
    id: string; // uuid
    hentingId?: string; // uuid
    kategoriId?: string; // uuid
    vekt?: number;
}

export interface ApiVektregistreringParams {
    id?: string;
    hentingId?: string; // uuid
    kategoriId?: string; // uuid
    before?: string; //LocalTimeDate Vektregistrering must be before this
    after?: string; //LocalTimeDate Vektregistrering must be after this
    vekt?: number;
}

export interface ApiVektregistreringPost {
    hentingId: string; // uuid
    kategoriId: string; // uuid
    vekt: number;
}

const vektregistreringEndpoint = '/vektregistrering';
export const vektregistreringDefaultQueryKey = 'getVektregistreringer';

export const getVektregistreringer = (params: ApiVektregistreringParams = {}): Promise<Array<ApiVektregistrering>> =>
    httpClient()
        .get<Array<ApiVektregistrering>>(vektregistreringEndpoint, { params })
        .then(extractResponse, transformError);

export const deleteVektregistrering = (vektregistreringId: string): Promise<ApiVektregistrering> =>
    httpClient()
        .delete<ApiVektregistrering>(`${vektregistreringEndpoint}/${vektregistreringId}`)
        .then(extractResponse, transformError);

export const postVektregistrering = (newVektregistrering: ApiVektregistreringPost): Promise<ApiVektregistrering> =>
    httpClient()
        .post<ApiVektregistrering>(vektregistreringEndpoint, newVektregistrering)
        .then(extractResponse, transformError);

export const patchVektregistrering = (updateVektregistrering: ApiVektregistreringPatch): Promise<ApiVektregistrering> =>
    httpClient()
        .patch<ApiVektregistrering>(vektregistreringEndpoint, updateVektregistrering)
        .then(extractResponse, transformError);
