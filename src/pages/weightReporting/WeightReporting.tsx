import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useMemo, useState } from 'react';
import { PostToAPI } from '../../utils/PostToAPi';
import { WithdrawalSubmission } from './WithdrawalSubmission';
import { Colors, Withdrawal } from '../../types';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { Loading } from '../loading/Loading';

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

    // Withdrawal objects
    //const [withdrawals, setWithdrawals] = useState<Array<Withdrawal>>([]);

    // List of withdrawals fetched from the server
    const { data: apiWithdrawals, isValidating, mutate } = useSWR<Array<Withdrawal>>(
        ['/api/withdrawals', keycloak.token],
        fetcher,
    );
    const withdrawals =
        apiWithdrawals && apiWithdrawals.length !== 0
            ? apiWithdrawals.map((withdrawal: Withdrawal) => {
                  withdrawal.start = new Date(withdrawal.start);
                  withdrawal.end = new Date(withdrawal.end);
                  return withdrawal;
              })
            : [
                  {
                      id: '1',
                      start: new Date(),
                      end: new Date(),
                  },
                  {
                      id: '2',
                      weight: 200,
                      start: new Date(),
                      end: new Date(),
                  },
                  {
                      id: '3',
                      weight: 200,
                      start: new Date(),
                      end: new Date(),
                  },
                  {
                      id: '4',
                      start: new Date(),
                      end: new Date(),
                  },
                  {
                      id: '5',
                      weight: 200,
                      start: new Date(),
                      end: new Date(),
                  },
                  {
                      id: '6',
                      weight: 200,
                      start: new Date(),
                      end: new Date(),
                  },
                  {
                      id: '7',
                      weight: 200,
                      start: new Date(),
                      end: new Date(),
                  },
                  {
                      id: '8',
                      weight: 200,
                      start: new Date(),
                      end: new Date(),
                  },
                  {
                      id: '9',
                      weight: 200,
                      start: new Date(),
                      end: new Date(),
                  },
                  {
                      id: '10',
                      weight: 200,
                      start: new Date(),
                      end: new Date(),
                  },
                  {
                      id: '11',
                      weight: 200,
                      start: new Date(),
                      end: new Date(),
                  },
              ];

    /*useEffect(() => {

        setWithdrawals(withdrawals);
    }, [apiWithdrawals]);*/

    const onSubmit = async (weight: number, id: string) => {
        try {
            // update the local data immediately, but disable the revalidation
            const newWithdrawal = withdrawals.find((withdrawal) => withdrawal.id === id);
            if (newWithdrawal) {
                newWithdrawal.weight = weight;
                mutate([...withdrawals, newWithdrawal], false);

                // Post update to API
                await PostToAPI('/api/weight', { weight }, keycloak.token);

                // trigger a revalidation (refetch) to make sure our local data is correct
                mutate();
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Create a list of memoized elements such that we don't need to rerender every list element
    // when one gets updated
    const withdrawalList = withdrawals.map((withdrawal) => (
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
            {(!withdrawals || withdrawals.length <= 0) && isValidating ? (
                <Loading text="Laster inn data..." />
            ) : (
                <Content>
                    <Latest>
                        <h2>Siste uttak</h2>
                        {withdrawalList.slice(0, 1)}
                    </Latest>
                    <Older>
                        <h2>Tidligere uttak</h2>
                        <OverflowWrapper>{withdrawalList.slice(1)}</OverflowWrapper>
                    </Older>
                </Content>
            )}
        </Wrapper>
    );
};
