import { extractResponse, httpClient, transformError } from '../httpClient';
import { ApiKontakt } from './KontaktService';

export type AktorType = 'PARTNER' | 'STASJON';

export interface ApiAktor {
    id: string;
    navn: string;
    kontaktPersoner: Array<ApiKontakt>;
}

const aktorEndpoint = '/aktor';
export const aktorDefaultQueryKey = 'findOneAktor';

export const findOneAktor = (aktorId: string): Promise<AktorType> =>
    httpClient().get<AktorType>(`${aktorEndpoint}/${aktorId}`).then(extractResponse, transformError);
