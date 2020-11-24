import { httpClient } from './httpClient';
import { ApiStation } from './StationService';

const endpoint = '/reports';
export const reportsDefaultQueryKey = 'getReports';

export interface ApiReport {
    reportId: number;
    eventId: number;
    partnerId: number;
    station: ApiStation;
    startDateTime: string;
    endDateTime: string;
    weight: number | null;
    reportedDateTime: string | null;
}

// TODO: remove when all uses are replaced by ApiReport
export interface Withdrawal {
    reportId: number;
    eventId: number;
    partnerId: number;
    station: ApiStation;
    startDateTime: Date;
    endDateTime: Date;
    weight: number | null;
    reportedDateTime: Date | null;
}

export interface ApiReportPatch {
    id: number;
    weight: number;
}

export interface ApiReportParams {
    eventId?: number;
    stationId?: number;
    partnerId?: number;
    fromDate?: string;
    toDate?: string;
}

// First parameter is the query key passed by react-query
export const getReports = (_: string, params: ApiReportParams, token: string): Promise<Array<ApiReport>> =>
    httpClient(token)
        .get<Array<ApiReport>>(endpoint, { params })
        .then((response) => response.data);

// First parameter is the query key passed by react-query
export const getReportById = (_: string, reportId: number, token: string): Promise<ApiReport> =>
    httpClient(token)
        .get<ApiReport>(`${endpoint}/${reportId}`)
        .then((response) => response.data);

export const patchReport = (updatedReport: ApiReportPatch, token: string): Promise<ApiReport> =>
    httpClient(token)
        .patch<ApiReport>(endpoint, updatedReport)
        .then((response) => response.data);
