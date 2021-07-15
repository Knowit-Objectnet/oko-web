import { ApiPlanlagtHenting } from './PlanlagtHentingService';
import { ApiEkstraHenting } from './EkstraHentingService';
import { extractResponse, httpClient, transformError } from '../httpClient';

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

const hentingEndpoint = '/hentinger';
export const hentingDefaultQueryKey = 'findOneHentingById';

export const getHentingById = (hentingId: string): Promise<ApiHentingWrapper> =>
    httpClient().get<ApiHentingWrapper>(`${hentingEndpoint}/${hentingId}`).then(extractResponse, transformError);
