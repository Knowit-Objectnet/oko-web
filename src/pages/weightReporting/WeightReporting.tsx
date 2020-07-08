import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useMemo, useState } from 'react';
import { PostToAPI } from '../../utils/PostToAPi';
import { WithdrawalSubmission } from './WithdrawalSubmission';
import { Colors } from '../../types';
import { useGetWithdrawals } from '../../hooks/useGetWithdrawals';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: ${Colors.LightBeige};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    min-width: 400px;
`;

const Latest = styled.div`
    margin-top: 65px;
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
    let fetchedWithdrawals = useGetWithdrawals();
    fetchedWithdrawals =
        fetchedWithdrawals.length !== 0
            ? fetchedWithdrawals
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
              ];

    const [withdrawals, setWithdrawals] = useState(fetchedWithdrawals);

    const onSubmit = async (weight: number, id: string) => {
        try {
            // Post data
            const data = {
                weight,
            };

            // Post update to API
            await PostToAPI('/api/weight', data, keycloak.token);

            // Create new state with updated weight
            const newWithdrawals = withdrawals.map((w) => (w.id === id ? { ...w, weight: weight } : w));

            // Update the withdrawals
            setWithdrawals(newWithdrawals);
        } catch (err) {
            console.log(err);
        }
    };

    // Create a list of memoized elements such that we don't need to rerender every list element
    // when one gets updated
    const withdrawalList = withdrawals.map((withdrawal) =>
        useMemo(
            () => (
                <WithdrawalSubmission
                    key={withdrawal.id}
                    id={withdrawal.id}
                    weight={withdrawal.weight}
                    start={withdrawal.start}
                    end={withdrawal.end}
                    onSubmit={onSubmit}
                />
            ),
            [withdrawal],
        ),
    );

    return (
        <Wrapper>
            <Content>
                <Latest>
                    <h2>Siste uttak</h2>
                    {withdrawalList.slice(0, 1)}
                </Latest>
                <h2>Tidligere uttak</h2>
                <OverflowWrapper>{withdrawalList.slice(1)}</OverflowWrapper>
            </Content>
        </Wrapper>
    );
};
