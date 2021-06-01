import { httpClient } from '../services/httpClient';
import { AktorType } from '../types';

export interface ApiKontakt {
    id: string;
    navn: string;
    telefon: string;
    rolle: string;
}

export interface ApiAktor {
    id: string;
    navn: string;
    kontaktPersoner: Array<ApiKontakt>;
}

const aktorEndpoint = '/aktor';
export const aktorDefaultQueryKey = 'findOneAktor';

export const findOneAktor = (aktorId: string): Promise<AktorType> =>
    httpClient()
        .get<AktorType>(`${aktorEndpoint}/${aktorId}`)
        .then((response) => response.data);
