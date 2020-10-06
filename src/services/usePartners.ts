import useSWR from 'swr';
import { apiUrl, Partner } from '../types';
import { fetcher } from '../utils/fetcher';

export interface PartnersApiService {
    data?: Array<Partner>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<Partner>) => void;
}

export const usePartners = (): PartnersApiService => {
    const endpoint = `${apiUrl}/partners/`;

    const { data, error, isValidating, mutate } = useSWR<Array<Partner>>(endpoint, fetcher);

    return {
        data,
        isValidating,
        error,
        mutate,
    };
};
