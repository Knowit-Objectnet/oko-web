import useSWR from 'swr';
import { apiUrl, Partner } from '../types';
import { fetcher } from '../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';

export interface PartnerApiService {
    data?: Partner;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Partner) => void;
}

export const usePartner = (partnerId: number): PartnerApiService => {
    const [keycloak] = useKeycloak();

    const endpoint = `${apiUrl}/partners/`;
    const paramsString = `?partnerId=${partnerId}`;

    const { data, error, isValidating, mutate } = useSWR<Partner>(
        [`${endpoint}${paramsString}`, keycloak.token],
        fetcher,
    );

    return {
        data,
        isValidating,
        error,
        mutate,
    };
};
