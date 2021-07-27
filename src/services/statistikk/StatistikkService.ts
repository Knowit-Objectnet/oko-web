import { extractResponse, httpClient, transformError } from '../httpClient';

export interface ApiStatistikk {
    partnerNavn: string;
    stasjoner: ApiStasjonStatistikk[];
}

export interface ApiStasjonStatistikk {
    stasjonNavn: string;
    kategorier: ApiKategoriStatistikk[];
}

export interface ApiKategoriStatistikk {
    kategoriId: string; //UUID
    kategoriNavn: string;
    vekt: number;
}

export interface ApiStatistikkParams {
    partnerId?: string; //UUID
    stasjonId?: string; //UUID
    kategoriId?: string; //UUID
    before?: string; //LocalTimeDate Henting must be before this
    after?: string; //LocalTimeDate Henting must be after this
}

const statistikkEndpoint = '/statistikk';
export const statistikkDefaultQueryKey = 'getStatistikk';

export const getStatistikk = (params: ApiStatistikkParams = {}): Promise<Array<ApiStatistikk>> =>
    httpClient().get<Array<ApiStatistikk>>(statistikkEndpoint, { params }).then(extractResponse, transformError);
