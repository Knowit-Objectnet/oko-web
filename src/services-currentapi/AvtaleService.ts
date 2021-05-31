import { httpClient } from '../services/httpClient';
import { AvtaleType } from '../types';
import { ApiHenteplan, ApiHenteplanPost } from './HenteplanService';

export interface ApiAvtale {
    id: string;
    aktorId: string;
    type: AvtaleType;
    startDato: string; //LocalDate
    sluttDato: string; //LocalDate
    henteplaner: Array<ApiHenteplan>;
}

export interface ApiAvtalePost {
    aktorId: string;
    type: AvtaleType;
    startDato: string; //LocalDate
    sluttDato: string; //LocalDate
    henteplaner?: Array<ApiHenteplanPost>;
}

export interface ApiAvtaleParams {
    id?: string;
    aktorId?: string;
    type?: AvtaleType;
    startDato?: string; //LocalDate
    sluttDato?: string; //LocalDate
}

const avtaleEndpoint = '/avtaler';
export const avtaleDefaultQueryKey = 'getAvtaler';

export const getAvtaler = (params: ApiAvtaleParams = {}): Promise<Array<ApiAvtale>> =>
    httpClient()
        .get<Array<ApiAvtale>>(avtaleEndpoint, { params })
        .then((response) => response.data);

export const getAvtaleById = (avtaleId: string): Promise<ApiAvtale> =>
    httpClient()
        .get<ApiAvtale>(`${avtaleEndpoint}/${avtaleId}`)
        .then((response) => response.data);

export const postAvtale = (newavtale: ApiAvtalePost): Promise<ApiAvtale> =>
    httpClient()
        .post<ApiAvtale>(avtaleEndpoint, newavtale)
        .then((response) => response.data);

export const deleteAvtale = (avtaleId: string): Promise<ApiAvtale> =>
    httpClient()
        .delete<ApiAvtale>(`${avtaleEndpoint}/${avtaleId}`)
        .then((response) => response.data);
