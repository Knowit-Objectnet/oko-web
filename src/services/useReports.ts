import { useKeycloak } from '@react-keycloak/web';
import useSWR from 'swr';
import { apiUrl, Report } from '../types';
import { fetcher } from '../utils/fetcher';
import { PatchToAPI } from '../utils/PatchToAPI';

export interface ReportsApi {
    data?: Array<Report>;
    error: boolean;
    isValidating: boolean;
    mutate: (data?: Array<Report>) => void;
    updateReport: (id: number, weight: number) => void;
}

export const useReports = (): ReportsApi => {
    const [keycloak] = useKeycloak();

    // FIXME: this is not ideal
    // Date object of now, to get all past (but not future) reports
    const date = new Date();
    /* Set the seconds and milliseconds of the date object to 0
     *
     * Why milliseconds are set to 0: There seem to be a problem with the component rerendering a few milliseconds
     * after swr returns undefined (perhaps to return the fetched value?) and when the component rerendres the
     * swr key is obv. no longer the same as the date ISO string has changed by a few milliseconds. Meaning that
     * swr will continue to return undefined as it is forced to fetch data again leading to an error
     * "Uncaught Error: Maximum update depth exceeded." coming from swr.
     *
     * Why seconds are set to 0: This is more of an optimization and consistency decision. The optimization comes
     * from that the swr caching works for 1 minute and the consistency decision comes from that by setting it to 0
     * we make sure that a withdrwal always shows up the minute after it's timestamp. Instead of one withdrawal
     * showing up at 11:53:00 and another at 11:53:55 although both shows up as 11:53 for the user in the GUI.
     */
    date.setSeconds(0, 0);

    const { data, error, isValidating, mutate } = useSWR<Array<Report>>(
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
