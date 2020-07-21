import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useMemo, useState } from 'react';
import { PostToAPI } from '../../utils/PostToAPI';
import { WithdrawalSubmission } from './WithdrawalSubmission';
import { apiUrl, Colors, Withdrawal } from '../../types';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { Loading } from '../loading/Loading';
import { PatchToAPI } from '../../utils/PatchToAPI';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: ${Colors.White};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    min-width: 500px;
    width: 65%;
`;

const Latest = styled.div`
    margin-top: 65px;
    width: 100%;
`;

const Older = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const OverflowWrapper = styled.div`
    flex: 1;
    overflow: auto;
`;

/**
 * Weight reporting component for reporting weight from item withdrawals
 */
export const WeightReporting: React.FC = () => {
    // Getting Keycloak instance
    const { keycloak } = useKeycloak();

    // List of withdrawals fetched from the server
    const { data: apiWithdrawals, isValidating, mutate } = useSWR<Array<Withdrawal>>(
        [`${apiUrl}/weight-reporting/reports/?partner-id=${keycloak.tokenParsed.GroupID}`, keycloak.token],
        fetcher,
    );
    // List of withdrawals transformed from the Api fetch
    const [withdrawals, setWithdrawals] = useState<Array<Withdrawal> | null>(null);

    useEffect(() => {
        // If the api was successful and returned an array then transform it and update state
        if (apiWithdrawals) {
            // Transform the array from the api into a proper withdrawals list
            const _withdrawals = apiWithdrawals.map((withdrawal: Withdrawal) => {
                withdrawal.start = new Date(withdrawal.start);
                withdrawal.end = new Date(withdrawal.end);
                return withdrawal;
            });
            // Update the state
            setWithdrawals(_withdrawals);
        }
    }, [apiWithdrawals]);

    const onSubmit = React.useCallback(async (weight: number, id: string) => {
        try {
            if (withdrawals) {
                // update the local data immediately, but disable the revalidation
                const newWithdrawal = withdrawals.find((withdrawal) => withdrawal.id === id);
                if (newWithdrawal) {
                    newWithdrawal.weight = weight;
                    mutate([...withdrawals, newWithdrawal], false);

                    // Post update to API
                    await PatchToAPI(`${apiUrl}/weight-reporting/reports/`, { id, weight }, keycloak.token);

                    // trigger a revalidation (refetch) to make sure our local data is correct
                    mutate();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    // Create a list of memoized elements such that we don't need to rerender every list element
    // when one gets updated
    const withdrawalList =
        withdrawals &&
        withdrawals.map((withdrawal) => (
            <WithdrawalSubmission
                key={withdrawal.id}
                id={withdrawal.id}
                weight={withdrawal.weight}
                start={withdrawal.start}
                end={withdrawal.end}
                onSubmit={onSubmit}
            />
        ));

    return (
        <Wrapper>
            {!withdrawals && isValidating ? (
                <Loading text="Laster inn data..." />
            ) : (
                <Content>
                    <Latest>
                        <h2>Siste uttak</h2>
                        {withdrawalList && withdrawalList.slice(0, 1)}
                    </Latest>
                    <Older>
                        <h2>Tidligere uttak</h2>
                        <OverflowWrapper>{withdrawalList && withdrawalList.slice(1)}</OverflowWrapper>
                    </Older>
                </Content>
            )}
        </Wrapper>
    );
};
