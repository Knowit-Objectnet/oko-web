import { useGetFetchAPI } from './useGetFetchAPI';

export const useGetCategories: () => Array<string> = () => {
    return useGetFetchAPI<string>('/api/categories');
};
