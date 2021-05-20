import { QueryObserverResult, useQuery } from 'react-query';
import { ApiReport, ApiReportParams, getReports, reportsDefaultQueryKey } from '../ReportService';

export const useReports = (params: ApiReportParams = {}): QueryObserverResult<Array<ApiReport>> => {
    return useQuery<Array<ApiReport>>({
        queryKey: [reportsDefaultQueryKey, params],
        queryFn: () => getReports(params),
    });
};
