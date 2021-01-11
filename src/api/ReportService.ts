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

export const getReports = (params: ApiReportParams, token: string): Promise<Array<ApiReport>> =>
    httpClient(token)
        .get<Array<ApiReport>>(endpoint, { params })
        .then((response) => response.data);

export const getReportById = (reportId: number, token: string): Promise<ApiReport> =>
    httpClient(token)
        .get<ApiReport>(`${endpoint}/${reportId}`)
        .then((response) => response.data);

export const patchReport = (updatedReport: ApiReportPatch, token: string): Promise<ApiReport> =>
    httpClient(token)
        .patch<ApiReport>(endpoint, updatedReport)
        .then((response) => response.data);
