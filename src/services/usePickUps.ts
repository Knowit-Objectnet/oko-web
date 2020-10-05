import useSWR from 'swr';
import { apiUrl, ApiPickup, ApiPickupPost, ApiPickupPatch } from '../types';
import { fetcher } from '../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { ApiPostClient } from './ApiPostClient';
import { ApiPatchClient } from './ApiPatchClient';

export interface PickupsApiService {
    data?: Array<ApiPickup>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<ApiPickup>) => void;
    addPickup: (station: ApiPickupPost) => Promise<ApiPickup>;
    updatePickup: (station: ApiPickupPatch) => Promise<ApiPickup>;
}

export const usePickups = (): PickupsApiService => {
    const [keycloak] = useKeycloak();
    const endpoint = `${apiUrl}/pickups`;

    const { data, error, isValidating, mutate } = useSWR<Array<ApiPickup>>(endpoint, fetcher);

    const updatePickup = async (pickupPatch: ApiPickupPatch) => {
        const response = await ApiPatchClient<ApiPickupPatch, ApiPickup>(endpoint, pickupPatch, keycloak.token);
        console.log(response);
        await mutate();
        return response;
    };

    const addPickup = async (pickup: ApiPickupPost) => {
        const response = await ApiPostClient<ApiPickupPost, ApiPickup>(endpoint, pickup, keycloak.token);
        await mutate();
        return response;
    };

    return {
        data,
        isValidating,
        error,
        mutate,
        addPickup,
        updatePickup,
    };
};
