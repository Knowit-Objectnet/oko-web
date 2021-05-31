import { extractResponse, httpClient, transformError } from '../httpClient';

export interface ApiPlanlagtHenting {
    id: string; //UUID
    startTidspunkt: string; //LocalTimeDate
    sluttTidspunkt: string; //LocalTimeDate
    merknad: string | null;
    henteplanId: string; //UUID
    avlyst: string | null; //LocalTimeDate
    avtaleId: string; //UUID
    aktorId: string; //UUID
    aktorNavn: string;
    stasjonId: string; //UUID
    stasjonNavn: string;
}

export interface ApiPlanlagtHentingParams {
    id?: string; //UUID
    before?: string; //LocalTimeDate Henting must be before this
    after?: string; //LocalTimeDate Henting must be after this
    merknad?: string;
    henteplanId?: string;
    avlyst?: boolean;
}

export interface ApiPlanlagtHentingPatch {
    id: string; //UUID
    startTidspunkt?: string; //LocalTimeDate
    sluttTidspunkt?: string; //LocalTimeDate
    merknad?: string;
    avlyst?: string; //LocalTimeDate
}

const hentingEndpoint = '/planlagte-hentinger';
export const planlagtHentingDefaultQueryKey = 'getPlanlagteHentinger';

export const getPlanlagteHentinger = (params: ApiPlanlagtHentingParams = {}): Promise<Array<ApiPlanlagtHenting>> =>
    httpClient()
        .get<Array<ApiPlanlagtHenting>>(hentingEndpoint, { params })
        .then(extractResponse, transformError);

export const getPlanlagtHentingById = (hentingId: string): Promise<ApiPlanlagtHenting> =>
    httpClient().get<ApiPlanlagtHenting>(`${hentingEndpoint}/${hentingId}`).then(extractResponse, transformError);

export const deletePlanlagtHenting = (hentingId: string): Promise<ApiPlanlagtHenting> =>
    httpClient().delete<ApiPlanlagtHenting>(`${hentingEndpoint}/${hentingId}`).then(extractResponse, transformError);

export const patchPlanlagtHenting = (updatedHenting: ApiPlanlagtHentingPatch): Promise<ApiPlanlagtHenting> =>
    httpClient().patch<ApiPlanlagtHenting>(hentingEndpoint, updatedHenting).then(extractResponse, transformError);