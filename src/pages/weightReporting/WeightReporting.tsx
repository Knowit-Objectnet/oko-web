import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { WithdrawalSubmission } from './WithdrawalSubmission';
import { Loading } from '../../sharedComponents/Loading';
import { Helmet } from 'react-helmet';
import { useReports } from '../../api/hooks/useReports';
import { formatISO } from 'date-fns';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.colors.White};
`;

const Content = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
`;

const Latest = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    margin-top: 65px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Older = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const ReportList = styled.ul`
    display: flex;
    padding: 0;
    list-style: none;
    flex-flow: column;
`;

export const WeightReporting: React.FC = () => {
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.GroupID;

    const { data: reports, isLoading, isError } = useReports({
        partnerId: userId,
        toDate: formatISO(new Date().setMinutes(0, 0, 0)),
    });

    const reportsSortedByStartTime = (reports ?? []).sort((reportA, reportB) => {
        const timeA = new Date(reportA.startDateTime).getTime();
        const timeB = new Date(reportB.startDateTime).getTime();

        if (timeA === timeB) {
            return reportB.reportId - reportA.reportId;
        }
        return timeB - timeA;
    });

    return (
        <Wrapper>
            <Helmet>
                <title>Vektuttak</title>
            </Helmet>
            {isLoading ? (
                <Loading text="Laster inn data..." />
            ) : isError ? (
                <p>Kunne ikke laste vektuttak</p>
            ) : reportsSortedByStartTime.length === 0 ? (
                <p>Ingen registrerte vektuttak</p>
            ) : (
                <Content>
                    <Latest>
                        <h2>Ikke rapportert</h2>
                        <ReportList>
                            {reportsSortedByStartTime
                                .filter((report) => !report.weight)
                                .map((report) => (
                                    <WithdrawalSubmission report={report} key={report.reportId} />
                                ))}
                        </ReportList>
                    </Latest>
                    <Older>
                        <h2>Tidligere uttak</h2>
                        <ReportList>
                            {reportsSortedByStartTime
                                .filter((report) => report.weight)
                                .map((report) => (
                                    <WithdrawalSubmission report={report} key={report.reportId} />
                                ))}
                        </ReportList>
                    </Older>
                </Content>
            )}
        </Wrapper>
    );
};
