import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useCallback, useEffect, useState } from 'react';
import { WithdrawalSubmission } from './WithdrawalSubmission';
import { apiUrl, Withdrawal } from '../../types';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { Loading } from '../../sharedComponents/Loading';
import { PatchToAPI } from '../../utils/PatchToAPI';
import { useAlert, types } from 'react-alert';
import { Helmet } from 'react-helmet';

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
    // Alert dispatcher
    const alert = useAlert();
    // Getting Keycloak instance
    const { keycloak } = useKeycloak();
    // Date object of now
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

    // List of withdrawals fetched from the server
    // NB: toDate filters based on the 'end' timestamp of the withdrawal.
    const { data: apiWithdrawals, isValidating, mutate } = useSWR<Array<Withdrawal>>(
        [`${apiUrl}/reports/?partnerId=${keycloak.tokenParsed.GroupID}&toDate=${date.toISOString()}`, keycloak.token],
        fetcher,
    );
    // List of withdrawals transformed from the Api fetch
    const [withdrawals, setWithdrawals] = useState<Array<Withdrawal> | null>(null);

    useEffect(() => {
        // If the api was successful and returned an array then transform it and update state
        if (apiWithdrawals) {
            // Transform the array from the api into a proper withdrawals list
            const _withdrawals = apiWithdrawals.map((withdrawal: Withdrawal) => {
                withdrawal.startDateTime = new Date(withdrawal.startDateTime);
                withdrawal.endDateTime = new Date(withdrawal.endDateTime);
                withdrawal.reportedDateTime = new Date(withdrawal.reportedDateTime);
                return withdrawal;
            });
            // First sort on start date and then sort on reportID
            _withdrawals.sort((withdrawalA, withdrawalB) => {
                withdrawalA.startDateTime.setSeconds(0, 0);
                withdrawalB.startDateTime.setSeconds(0, 0);
                const timeA = withdrawalA.startDateTime.getTime();
                const timeB = withdrawalB.startDateTime.getTime();
                const idA = withdrawalA.reportId;
                const idB = withdrawalB.reportId;

                if (timeA == timeB) {
                    return idA < idB ? 1 : idA > idB ? -1 : 0;
                } else {
                    return timeA < timeB ? 1 : -1;
                }
            });
            // Update the state
            setWithdrawals(_withdrawals);
        }
    }, [apiWithdrawals]);

    const onSubmit = useCallback(
        async (weight: number, id: number) => {
            try {
                if (apiWithdrawals) {
                    // update the local data immediately, but disable the revalidation
                    const updatedWithdrawal = apiWithdrawals.find((withdrawal) => withdrawal.reportId === id);
                    if (updatedWithdrawal) {
                        const newWithdrawal = {
                            ...updatedWithdrawal,
                            weight,
                        };
                        const newWithdrawals = apiWithdrawals.filter((withdrawal) => withdrawal.reportId !== id);
                        mutate([...newWithdrawals, newWithdrawal], false);

                        // Post update to API
                        await PatchToAPI(`${apiUrl}/reports/`, { id, weight }, keycloak.token);

                        // Give user feedback
                        alert.show('Uttaket ble oppdatert suksessfullt.', { type: types.SUCCESS });

                        // trigger a revalidation (refetch) to make sure our local data is correct
                        mutate();
                    }
                }
            } catch (err) {
                alert.show('Noe gikk kalt, uttaket ble ikke oppdatert.', { type: types.ERROR });
            }
        },
        [apiWithdrawals, mutate],
    );

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
                                {withdrawals &&
                                    withdrawals
                                        .filter((withdrawal) => !withdrawal.weight)
                                        .map((withdrawal) => (
                                            <WithdrawalSubmission
                                                key={withdrawal.reportId}
                                                id={withdrawal.reportId}
                                                weight={withdrawal.weight}
                                                start={withdrawal.startDateTime}
                                                end={withdrawal.endDateTime}
                                                location={withdrawal.station}
                                                onSubmit={onSubmit}
                                            />
                                        ))}
                            </OverflowWrapper>
                        </Latest>
                        <Older>
                            <h2>Tidligere uttak</h2>
                            <OverflowWrapper>
                                {withdrawals &&
                                    withdrawals
                                        .filter((withdrawal) => withdrawal.weight)
                                        .map((withdrawal) => (
                                            <WithdrawalSubmission
                                                key={withdrawal.reportId + 'weight'}
                                                id={withdrawal.reportId}
                                                weight={withdrawal.weight}
                                                start={withdrawal.startDateTime}
                                                end={withdrawal.endDateTime}
                                                location={withdrawal.station}
                                                onSubmit={onSubmit}
                                            />
                                        ))}
                            </OverflowWrapper>
                        </Older>
                    </Content>
                )}
            </Wrapper>
        </>
    );
};
