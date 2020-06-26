import { useGetFetchAPI } from './useGetFetchAPI';

export const useGetPartners: () => Array<string> = () => {
    return useGetFetchAPI<string>('/api/partners');
};
