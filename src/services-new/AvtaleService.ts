import { httpClient } from '../services/httpClient';
import { AvtaleType } from '../types';
import { ApiAktor } from './AktorService';
import { ApiHenteplan, ApiHenteplanDownstream, ApiHenteplanPost } from './HenteplanService';

interface ApiAvtaleBase {
    id: string;
    type: AvtaleType;
    startDato: string; //LocalDate
    sluttDato: string; //LocalDate
}

export interface ApiAvtaleDownstream extends ApiAvtaleBase {
    aktorId: string;
    henteplaner: Array<ApiHenteplanDownstream>;
}

export interface ApiAvtaleUpstream extends ApiAvtaleBase {
    aktor: ApiAktor;
}

export interface ApiAvtale extends ApiAvtaleBase {
    aktor: ApiAktor;
    henteplaner: Array<ApiHenteplanDownstream>;
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

export const getAvtaler = (params: ApiAvtaleParams): Promise<Array<ApiAvtale>> =>
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
