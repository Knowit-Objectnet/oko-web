import { useGetFetchAPI } from './useGetFetchAPI';

export const useGetLocations: () => Array<string> = () => {
    return useGetFetchAPI<string>('/api/locations');
};
