import * as React from 'react';
import styled from 'styled-components';
import { WithdrawalSubmission } from './WithdrawalSubmission';
import { Loading } from '../../sharedComponents/Loading';
import { Helmet } from 'react-helmet';
import { useReports } from '../../services/useReports';

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
    overflow: auto;
`;

const Older = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    margin-bottom: 20px;
`;

const OverflowWrapper = styled.div`
    flex: 1;
    overflow: auto;
`;

/**
 * Weight reporting component for reporting weight from item withdrawals
 */
export const WeightReporting: React.FC = () => {
    const { data: withdrawals, isValidating } = useReports();

    // First sort on start date and then sort on reportID
    const sortedWithdrawals = (withdrawals ?? []).sort((withdrawalA, withdrawalB) => {
        const withdrawalAstart = new Date(withdrawalA.startDateTime);
        const withdrawalBstart = new Date(withdrawalB.startDateTime);

        if (withdrawalAstart > withdrawalBstart) {
            return -1;
        }
        if (withdrawalAstart < withdrawalBstart) {
            return 1;
        }
        return 0;
    });

    return (
        <>
            <Helmet>
                <title>Vektuttak</title>
            </Helmet>
            <Wrapper>
                {!withdrawals && isValidating ? (
                    <Loading text="Laster inn data..." />
                ) : (
                    <Content>
                        <Latest>
                            <h2>Ikke rapportert</h2>
                            <OverflowWrapper>
                                {sortedWithdrawals
                                    .filter((withdrawal) => !withdrawal.weight)
                                    .map((withdrawal) => (
                                        <WithdrawalSubmission key={withdrawal.reportId} withdrawal={withdrawal} />
                                    ))}
                            </OverflowWrapper>
                        </Latest>
                        <Older>
                            <h2>Tidligere uttak</h2>
                            <OverflowWrapper>
                                {sortedWithdrawals
                                    .filter((withdrawal) => withdrawal.weight)
                                    .map((withdrawal) => (
                                        <WithdrawalSubmission key={withdrawal.reportId} withdrawal={withdrawal} />
                                    ))}
                            </OverflowWrapper>
                        </Older>
                    </Content>
                )}
            </Wrapper>
        </>
    );
};
