import { useKeycloak } from '@react-keycloak/web';
import { QueryResult, useQuery } from 'react-query';
import { ApiReport, ApiReportParams, getReports, reportsDefaultQueryKey } from '../ReportService';

export const useReports = (params: ApiReportParams = {}): QueryResult<Array<ApiReport>> => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiReport>>({
        queryKey: [reportsDefaultQueryKey, params],
        queryFn: () => getReports(params, keycloak.token),
    });
};
