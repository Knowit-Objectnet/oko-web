import useSWR from 'swr';
import { apiUrl, Pickup, PickupPatch, PickupPost } from '../types';
import { fetcher } from '../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import { apiPost } from './apiPost';
import { apiPatch } from './apiPatch';

export interface PickupsApiService {
    data?: Array<Pickup>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<Pickup>) => void;
    addPickup: (station: PickupPost) => Promise<Pickup>;
    updatePickup: (station: PickupPatch) => Promise<Pickup>;
}

// TODO: set constraint(s) so that only necessary pickups are fetched from API
export const usePickups = (): PickupsApiService => {
    const [keycloak] = useKeycloak();
    const endpoint = `${apiUrl}/pickups/`;

    const { data, error, isValidating, mutate } = useSWR<Array<Pickup>>([endpoint, keycloak.token], fetcher);

    const updatePickup = async (pickupPatch: PickupPatch) => {
        const response = await apiPatch<PickupPatch, Pickup>(endpoint, pickupPatch, keycloak.token);
        console.log(response);
        await mutate();
        return response;
    };

    const addPickup = async (pickup: PickupPost) => {
        const response = await apiPost<PickupPost, Pickup>(endpoint, pickup, keycloak.token);
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
