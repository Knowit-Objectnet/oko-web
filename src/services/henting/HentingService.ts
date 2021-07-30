import { ApiPlanlagtHenting } from './PlanlagtHentingService';
import { ApiEkstraHenting } from './EkstraHentingService';
import { extractResponse, httpClient, transformError } from '../httpClient';
import { ApiVektregistrering } from '../vektregistrering/VektregistreringService';
import { ApiHentingKategori } from '../kategori/KategoriService';

export interface ApiHenting {
    id: string; //UUID
    stasjonId: string; //UUID
    stasjonNavn: string;
    startTidspunkt: string; //LocalTimeDate
    sluttTidspunkt: string; //LocalTimeDate
    kategorier: Array<ApiHentingKategori>;
    vektregistreringer: Array<ApiVektregistrering>;
}

export interface ApiHentingWrapper {
    id: string;
    startTidspunkt: string; //LocalTimeDate
    sluttTidspunkt: string; //LocalTimeDate
    type: 'PLANLAGT' | 'EKSTRA';
    planlagtHenting?: ApiPlanlagtHenting;
    ekstraHenting?: ApiEkstraHenting;
    stasjonId: string;
    stasjonNavn: string;
    aktorId?: string;
    aktorNavn?: string;
}

export interface ApiHentingParams {
    id?: string; //UUID
    before?: string; //LocalTimeDate Henting must be before this
    after?: string; //LocalTimeDate Henting must be after this
    aktorId?: string; //UUID
    stasjonId?: string; //UUID
}

const hentingEndpoint = '/hentinger';
export const hentingDefaultQueryKey = 'getHentinger';

export const getHentingById = (hentingId: string): Promise<ApiHentingWrapper> =>
    httpClient().get<ApiHentingWrapper>(`${hentingEndpoint}/${hentingId}`).then(extractResponse, transformError);

export const getHentinger = (params: ApiHentingParams = {}): Promise<Array<ApiHentingWrapper>> =>
    httpClient().get<Array<ApiHentingWrapper>>(hentingEndpoint, { params }).then(extractResponse, transformError);
