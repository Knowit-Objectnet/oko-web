import { extractResponse, httpClient, transformError } from '../httpClient';
import { ApiHenteplan, ApiHenteplanPost } from '../henteplan/HenteplanService';

export type AvtaleType = 'FAST' | 'ANNEN' | 'OMBRUKSARRANGEMENT' | 'INTERNTRANSPORT';

export interface ApiAvtale {
    id: string;
    aktorId: string;
    type: AvtaleType;
    startDato: string; //LocalDate
    sluttDato: string; //LocalDate
    henteplaner: Array<ApiHenteplan>;
    saksnummer: string;
}

export interface ApiAvtalePost {
    aktorId: string;
    type: AvtaleType;
    startDato: string; //LocalDate
    sluttDato: string; //LocalDate
    henteplaner?: Array<ApiHenteplanPost> | null;
    saksnummer?: string;
}

export interface ApiAvtalePatch {
    id: string;
    type?: AvtaleType;
    startDato?: string; //LocalDate
    sluttDato?: string; //LocalDate
    saksnummer?: string;
}

export interface ApiAvtaleParams {
    id?: string;
    aktorId?: string;
    type?: AvtaleType;
    startDato?: string; //LocalDate
    sluttDato?: string; //LocalDate
    saksnummer?: string;
}

const avtaleEndpoint = '/avtaler';
export const avtaleDefaultQueryKey = 'getAvtaler';

export const getAvtaler = (params: ApiAvtaleParams = {}): Promise<Array<ApiAvtale>> =>
    httpClient().get<Array<ApiAvtale>>(avtaleEndpoint, { params }).then(extractResponse, transformError);

export const getAvtaleById = (avtaleId: string): Promise<ApiAvtale> =>
    httpClient().get<ApiAvtale>(`${avtaleEndpoint}/${avtaleId}`).then(extractResponse, transformError);

export const postAvtale = (newAvtale: ApiAvtalePost): Promise<ApiAvtale> =>
    httpClient().post<ApiAvtale>(avtaleEndpoint, newAvtale).then(extractResponse, transformError);

export const patchAvtale = (updatedAvtale: ApiAvtalePatch): Promise<ApiAvtale> =>
    httpClient().patch<ApiAvtale>(avtaleEndpoint, updatedAvtale).then(extractResponse, transformError);

export const deleteAvtale = (avtaleId: string): Promise<ApiAvtale> =>
    httpClient().delete<ApiAvtale>(`${avtaleEndpoint}/${avtaleId}`).then(extractResponse, transformError);
