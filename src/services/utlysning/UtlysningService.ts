import { extractResponse, httpClient, transformError } from '../httpClient';

export interface ApiUtlysning {
    id: string; //UUID
    partnerId: string; //UUID
    hentingId: string; //UUID
    partnerPameldt: string | null; //DateTime
    stasjonGodkjent: string | null; //DateTime
    partnerSkjult: boolean;
    partnerVist: boolean;
    partnerNavn: string;
}

export interface ApiUtlysningParams {
    id?: string; //UUID
    partnerId?: string; //UUID
    hentingId?: string; //UUID
    partnerPameldt?: string; //DateTime
    stasjonGodkjent?: string; //DateTime
    partnerSkjult?: boolean;
    partnerVist?: boolean;
}

export interface ApiUtlysningPatch {
    id: string; //UUID
    partnerSkjult?: boolean;
    partnerVist?: boolean;
}

export interface ApiUtlysningPartnerAccept {
    id: string; //UUID
    toAccept: boolean;
}

export interface ApiUtlysningStasjonAccept {
    id: string; //UUID
    toAccept: boolean;
}

export interface ApiUtlysningPost {
    partnerId?: string; //UUID
    hentingId?: string; //UUID
    partnerPameldt?: string; //DateTime
    stasjonGodkjent?: string; //DateTime
    partnerSkjult?: boolean;
    partnerVist?: boolean;
}

export interface ApiUtlysningBatchPost {
    hentingId?: string; //UUID
    partnerPameldt?: string; //DateTime
    stasjonGodkjent?: string; //DateTime
    partnerSkjult?: boolean;
    partnerVist?: boolean;
    partnerIds: string[]; //UUIDs
}

const utlysningEndpoint = '/utlysninger';
export const utlysningDefaultQueryKey = 'getUtlysning';

export const getUtlysning = (params: ApiUtlysningParams = {}): Promise<Array<ApiUtlysning>> =>
    httpClient().get<Array<ApiUtlysning>>(utlysningEndpoint, { params }).then(extractResponse, transformError);

export const getUtlysningById = (utlysningId: string): Promise<ApiUtlysning> =>
    httpClient().get<ApiUtlysning>(`${utlysningEndpoint}/${utlysningId}`).then(extractResponse, transformError);

export const getUtlysningAcceptedForHenting = (hentingId: string): Promise<ApiUtlysning> =>
    httpClient().get<ApiUtlysning>(`${utlysningEndpoint}/godkjent/${hentingId}`).then(extractResponse, transformError);

export const deleteUtlysning = (utlysningId: string): Promise<ApiUtlysning> =>
    httpClient().delete<ApiUtlysning>(`${utlysningEndpoint}/${utlysningId}`).then(extractResponse, transformError);

export const patchUtlysning = (updatedUtlysning: ApiUtlysningPatch): Promise<ApiUtlysning> =>
    httpClient().patch<ApiUtlysning>(utlysningEndpoint, updatedUtlysning).then(extractResponse, transformError);

export const patchUtlysningPartnerAccept = (updatedUtlysning: ApiUtlysningPartnerAccept): Promise<ApiUtlysning> =>
    httpClient()
        .patch<ApiUtlysning>(`${utlysningEndpoint}/partner-aksepter`, updatedUtlysning)
        .then(extractResponse, transformError);

export const patchUtlysningStasjonAccept = (updatedUtlysning: ApiUtlysningStasjonAccept): Promise<ApiUtlysning> =>
    httpClient()
        .patch<ApiUtlysning>(`${utlysningEndpoint}/stasjon-aksepter`, updatedUtlysning)
        .then(extractResponse, transformError);

export const postUtlysning = (newUtlysning: ApiUtlysningPost): Promise<ApiUtlysning> =>
    httpClient().post<ApiUtlysning>(utlysningEndpoint, newUtlysning).then(extractResponse, transformError);

export const postBatchUtlysning = (newUtlysning: ApiUtlysningBatchPost): Promise<ApiUtlysning[]> =>
    httpClient().post<ApiUtlysning[]>(`${utlysningEndpoint}/batch`, newUtlysning).then(extractResponse, transformError);
