import { useKeycloak } from '@react-keycloak/web';
import useSWR from 'swr';
import { apiUrl, ApiWithdrawal } from '../types';
import { fetcher } from '../utils/fetcher';
import { PatchToAPI } from '../utils/PatchToAPI';

export interface IReportsApi {
    data?: Array<ApiWithdrawal>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<ApiWithdrawal>) => void;
    updateReport: (id: number, weight: number) => void;
}

export const useReports = (): IReportsApi => {
    const [keycloak] = useKeycloak();

    const date = new Date();
    date.setSeconds(0, 0);

    const { data, error, isValidating, mutate } = useSWR<Array<ApiWithdrawal>>(
        [`${apiUrl}/reports/?partnerId=${keycloak.tokenParsed.GroupID}&toDate=${date.toISOString()}`, keycloak.token],
        fetcher,
    );

    const updateReport = async (id: number, weight: number) => {
        await PatchToAPI(`${apiUrl}/reports/`, { id, weight }, keycloak.token);
        await mutate();
    };

    return {
        data,
        isValidating,
        error,
        mutate,
        updateReport,
    };
};
