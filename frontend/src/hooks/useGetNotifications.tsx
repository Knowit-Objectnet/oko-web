import { useGetFetchAPI } from './useGetFetchAPI';

export const useGetNotifications: () => Array<string> = () => {
    return useGetFetchAPI<string>('/api/notifications');
};
