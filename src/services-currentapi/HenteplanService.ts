import { extractResponse, httpClient, transformError } from '../services/httpClient';
import { ApiPlanlagtHenting } from './HentingService';

export type HenteplanFrekvens = 'ENKELT' | 'UKENTLIG' | 'ANNENHVER';

export type WorkingWeekdays = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';

export interface ApiHenteplan {
    id: string;
    avtaleId: string;
    stasjonId: string;
    frekvens: HenteplanFrekvens;
    startTidspunkt: string; //LocalTimeDate: Time used for Henting time
    sluttTidspunkt: string; //LocalTimeDate: Time used for Henting time
    ukedag: WorkingWeekdays;
    merknad: string | null;
    planlagteHentinger: Array<ApiPlanlagtHenting>;
}

export interface ApiHenteplanPost {
    avtaleId: string;
    stasjonId: string;
    frekvens: HenteplanFrekvens;
    startTidspunkt: string;
    sluttTidspunkt: string;
    ukedag: WorkingWeekdays;
    merknad?: string;
}

export interface ApiHenteplanPatch {
    id: string;
    frekvens?: HenteplanFrekvens;
    startTidspunkt?: string;
    sluttTidspunkt?: string;
    ukedag?: WorkingWeekdays;
    merknad?: string;
}

export interface ApiHenteplanParams {
    avtaleId?: string;
    stasjonId?: string;
    frekvens?: HenteplanFrekvens;
    before?: string; //LocalTimeDate Henteplan must end before this
    after?: string; //LocalTimeDate Henteplan must start after this
    ukedag?: WorkingWeekdays;
    id?: string;
}

const henteplanEndpoint = '/henteplaner';
export const henteplanDefaultQueryKey = 'getHenteplaner';

export const getHenteplaner = (params: ApiHenteplanParams = {}): Promise<Array<ApiHenteplan>> =>
    httpClient()
        .get<Array<ApiHenteplan>>(henteplanEndpoint, { params })
        .then(extractResponse, transformError);

export const getHenteplanById = (henteplanId: string): Promise<ApiHenteplan> =>
    httpClient().get<ApiHenteplan>(`${henteplanEndpoint}/${henteplanId}`).then(extractResponse, transformError);

export const getHenteplanerByAvtaleId = (avtaleId: string): Promise<Array<ApiHenteplan>> =>
    httpClient()
        .get<Array<ApiHenteplan>>(`${henteplanEndpoint}/avtale/${avtaleId}`)
        .then(extractResponse, transformError);

export const postHenteplan = (newHenteplan: ApiHenteplanPost): Promise<ApiHenteplan> =>
    httpClient().post<ApiHenteplan>(henteplanEndpoint, newHenteplan).then(extractResponse, transformError);

export const deleteHenteplan = (henteplanId: string): Promise<ApiHenteplan> =>
    httpClient().delete<ApiHenteplan>(`${henteplanEndpoint}/${henteplanId}`).then(extractResponse, transformError);

export const patchHenteplan = (updatedHenteplan: ApiHenteplanPatch): Promise<ApiHenteplan> =>
    httpClient().patch<ApiHenteplan>(henteplanEndpoint, updatedHenteplan).then(extractResponse, transformError);
