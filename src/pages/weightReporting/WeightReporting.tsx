import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { WeightReportList } from './WeightReportList';
import { Loading } from '../../sharedComponents/Loading';
import { Helmet } from 'react-helmet';
import { useReports } from '../../api/hooks/useReports';
import { formatISO } from 'date-fns';

const Wrapper = styled.section`
    margin: 25px auto;
    width: 60%;

    & h2 {
        font-size: 1.2rem;
    }
`;

export const WeightReporting: React.FC = () => {
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.GroupID;

    const { data: reports, isLoading, isError } = useReports({
        partnerId: userId,
        /* Fetching all reports for today, until midnight. */
        toDate: formatISO(new Date().setHours(24, 0, 0, 0)),
    });

    const pastReportsByStartTime = (reports ?? [])
        .filter((report) => {
            /* Removing reports for future events (from current time until midnight) */
            return new Date(report.startDateTime) < new Date();
        })
        .sort((reportA, reportB) => {
            const timeA = new Date(reportA.startDateTime).getTime();
            const timeB = new Date(reportB.startDateTime).getTime();

            if (timeA === timeB) {
                return reportB.reportId - reportA.reportId;
            }
            return timeB - timeA;
        });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <p>Kunne ikke laste vektuttak</p>;
    }

    if (pastReportsByStartTime.length === 0) {
        return <p>Ingen registrerte vektuttak</p>;
    }

    return (
        <Wrapper>
            <Helmet>
                <title>Vektuttak</title>
            </Helmet>
            <h1>Vektuttak</h1>
            <h2>Ikke rapportert</h2>
            <WeightReportList reports={pastReportsByStartTime.filter((report) => !report.weight)} />
            <h2>Tidligere uttak</h2>
            <WeightReportList reports={pastReportsByStartTime.filter((report) => report.weight !== null)} />
        </Wrapper>
    );
};
