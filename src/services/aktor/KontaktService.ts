import { extractResponse, httpClient, transformError } from '../httpClient';

export interface VerifiseringStatus {
    id: string;
    telefonVerifisert: boolean;
    epostVerifisert: boolean;
}

export interface ApiKontakt {
    id: string;
    aktorId: string;
    navn: string;
    telefon?: string;
    epost?: string;
    rolle?: string;
    verifiseringsStatus: VerifiseringStatus;
}

export interface ApiKontaktPost {
    aktorId: string;
    navn: string;
    rolle?: string;
    telefon?: string;
    epost?: string;
}

export interface ApiKontaktPatch {
    id: string;
    navn?: string;
    rolle?: string;
    telefon?: string;
    epost?: string;
}

export interface ApiKontaktParams {
    id?: string;
    aktorId?: string;
    navn?: string;
    telefon?: string;
    epost?: string;
    rolle?: string;
}

const kontaktEndpoint = '/kontakter';
export const kontaktDefaultQueryKey = 'getKontakt';

export const getKontakter = (params: ApiKontaktParams = {}): Promise<Array<ApiKontakt>> =>
    httpClient().get<Array<ApiKontakt>>(kontaktEndpoint, { params }).then(extractResponse, transformError);

export const getKontaktById = (kontaktId: string): Promise<ApiKontakt> =>
    httpClient().get<ApiKontakt>(`${kontaktEndpoint}/${kontaktId}`).then(extractResponse, transformError);

export const postKontakt = (newKontakt: ApiKontaktPost): Promise<ApiKontakt> =>
    httpClient().post<ApiKontakt>(kontaktEndpoint, newKontakt).then(extractResponse, transformError);

export const patchKontakt = (updatedKontakt: ApiKontaktPatch): Promise<ApiKontakt> =>
    httpClient().patch<ApiKontakt>(kontaktEndpoint, updatedKontakt).then(extractResponse, transformError);

export const deleteKontakt = (kontaktId: string): Promise<ApiKontakt> =>
    httpClient().delete<ApiKontakt>(`${kontaktEndpoint}/${kontaktId}`).then(extractResponse, transformError);
