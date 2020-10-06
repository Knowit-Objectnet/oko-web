import useSWR from 'swr';
import { apiUrl, Partner, PartnerPost } from '../types';
import { fetcher } from '../utils/fetcher';
import { ApiDeleteClient } from './ApiDeleteClient';
import { useKeycloak } from '@react-keycloak/web';
import { ApiPostClient } from './ApiPostClient';

export interface PartnersApiService {
    data?: Array<Partner>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<Partner>) => void;
    addPartner: (partner: PartnerPost) => Promise<Partner>;
    deletePartner: (partnerId: number) => void;
}

export const usePartners = (): PartnersApiService => {
    const [keycloak] = useKeycloak();
    const endpoint = `${apiUrl}/partners/`;

    const { data, error, isValidating, mutate } = useSWR<Array<Partner>>(endpoint, fetcher);

    const addPartner = async (partner: PartnerPost) => {
        const response = await ApiPostClient<PartnerPost, Partner>(endpoint, partner, keycloak.token);
        await mutate();
        return response;
    };

    const deletePartner = async (partnerId: number) => {
        await ApiDeleteClient(`${endpoint}?partnerId=${partnerId}`, keycloak.token);
        await mutate();
        // TODO: should this method return some response?
    };

    return {
        data,
        isValidating,
        error,
        mutate,
        deletePartner,
        addPartner,
    };
};
