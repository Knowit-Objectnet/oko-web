import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { Loading } from '../../sharedComponents/Loading';
import { Helmet } from 'react-helmet';
import { useReports } from '../../api/hooks/useReports';
import { formatISO } from 'date-fns';
import { WeightReportList } from './WeightReportList';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
`;

const Content = styled.section`
    padding: 25px;
    max-width: 100%;
`;

const Notice = styled.p`
    min-width: 80vw;
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

    const renderReports = () => {
        if (isLoading) {
            return <Loading />;
        }

        if (isError) {
            return <Notice>Kunne ikke laste vektuttak.</Notice>;
        }

        if (pastReportsByStartTime.length === 0) {
            return <Notice>Ingen registrerte vektuttak.</Notice>;
        }

        return (
            <>
                <WeightReportList
                    header="Ikke rapportert"
                    reports={pastReportsByStartTime.filter((report) => report.weight === null)}
                />
                <WeightReportList
                    header="Tidligere uttak"
                    reports={pastReportsByStartTime.filter((report) => report.weight !== null)}
                />
            </>
        );
    };

    return (
        <Wrapper>
            <Helmet>
                <title>Vektuttak</title>
            </Helmet>
            <Content>
                <h1>Vektuttak</h1>
                {renderReports()}
            </Content>
        </Wrapper>
    );
};
