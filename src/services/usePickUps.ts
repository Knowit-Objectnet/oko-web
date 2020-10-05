import useSWR from 'swr';
import { apiUrl, Pickup, PickupPost, PickupPatch } from '../types';
import { fetcher } from '../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { ApiPostClient } from './ApiPostClient';
import { ApiPatchClient } from './ApiPatchClient';

export interface PickupsApiService {
    data?: Array<Pickup>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<Pickup>) => void;
    addPickup: (station: PickupPost) => Promise<Pickup>;
    updatePickup: (station: PickupPatch) => Promise<Pickup>;
}

export const usePickups = (): PickupsApiService => {
    const [keycloak] = useKeycloak();
    const endpoint = `${apiUrl}/pickups/`;

    const { data, error, isValidating, mutate } = useSWR<Array<Pickup>>(endpoint, fetcher);

    const updatePickup = async (pickupPatch: PickupPatch) => {
        const response = await ApiPatchClient<PickupPatch, Pickup>(endpoint, pickupPatch, keycloak.token);
        console.log(response);
        await mutate();
        return response;
    };

    const addPickup = async (pickup: PickupPost) => {
        const response = await ApiPostClient<PickupPost, Pickup>(endpoint, pickup, keycloak.token);
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
