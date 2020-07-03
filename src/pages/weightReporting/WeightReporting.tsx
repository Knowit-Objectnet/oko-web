import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useMemo, useState } from 'react';
import { PostToAPI } from '../../utils/PostToAPi';
import { WithdrawalSubmission } from './Withdrawal';
import { Colors } from '../../types';
import mock = jest.mock;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: ${Colors.Yellow};
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

interface Withdrawal {
    id: string;
    weight?: number;
    start: Date;
    end: Date;
}

/**
 * Weight reporting component for reporting weight from item withdrawals
 */
export const WeightReporting: React.FC = () => {
    // Getting Keycloak instance
    const { keycloak } = useKeycloak();

    const [mockWithdrawals, setMockWithdrawals] = useState([
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
            weight: 200,
            start: new Date(),
            end: new Date(),
        },
        {
            id: '5',
            weight: 200,
            start: new Date(),
            end: new Date(),
        },
    ]);

    const onSubmit = async (weight: number, id: string) => {
        try {
            const data = {
                weight,
            };
            //await PostToAPI('/api/weight', data, keycloak.token);

            // Find the index of the updated withdrawal
            const index = mockWithdrawals.findIndex((_withdrawal) => _withdrawal.id === id);

            // Create shallow copy of withdrawals (this is fine because they arent deeply nested objects)
            const newMockWithdrawals = Array.from(mockWithdrawals);

            // Create a new object with the new weight
            newMockWithdrawals[index] = {
                ...newMockWithdrawals[index],
                weight: weight,
            };

            // Update the withdrawals
            setMockWithdrawals(newMockWithdrawals);
        } catch (err) {
            console.log(err);
        }
    };

    // Create a list of memoized elements such that we don't need to rerender every list element
    // when one gets updated
    const withdrawalList = mockWithdrawals.map((withdrawal) =>
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
