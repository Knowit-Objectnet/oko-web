import useSWR from 'swr';
import { apiUrl, ApiPickUp, ApiPickUpPost, ApiPickUpPatch } from '../types';
import { fetcher } from '../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { ApiPostClient } from './ApiPostClient';
import { ApiPatchClient } from './ApiPatchClient';

export interface PickUpsApiService {
    data?: Array<ApiPickUp>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<ApiPickUp>) => void;
    addPickUp: (station: ApiPickUpPost) => Promise<ApiPickUp>;
    updatePickUp: (station: ApiPickUpPatch) => Promise<ApiPickUp>;
}

export const usePickUps = (): PickUpsApiService => {
    const [keycloak] = useKeycloak();
    const endpoint = `${apiUrl}/pickups`;

    const { data, error, isValidating, mutate } = useSWR<Array<ApiPickUp>>(endpoint, fetcher);

    const updatePickUp = async (pickUpPatch: ApiPickUpPatch) => {
        const response = await ApiPatchClient<ApiPickUpPatch, ApiPickUp>(endpoint, pickUpPatch, keycloak.token);
        console.log(response);
        await mutate();
        return response;
    };

    const addPickUp = async (pickUp: ApiPickUpPost) => {
        const response = await ApiPostClient<ApiPickUpPost, ApiPickUp>(endpoint, pickUp, keycloak.token);
        await mutate();
        return response;
    };

    return {
        data,
        isValidating,
        error,
        mutate,
        addPickUp,
        updatePickUp,
    };
};
