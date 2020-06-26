import { useGetFetchAPI } from './useGetFetchAPI';

export const useGetChangeLog: () => Array<string> = () => {
    return useGetFetchAPI<string>('/api/log/changes');
};
