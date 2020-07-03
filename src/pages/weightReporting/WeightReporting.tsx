import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useMemo } from 'react';
import { PostToAPI } from '../../utils/PostToAPi';
import { WithdrawalSubmission } from './Withdrawal';
import { Colors } from '../../types';

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

    const mockWithdrawals: Array<Withdrawal> = [
        {
            id: '1',
            start: new Date(),
            end: new Date(),
        },
        {
            id: '1',
            weight: 200,
            start: new Date(),
            end: new Date(),
        },
    ];

    const onSubmit = async (weight: number) => {
        try {
            const data = {
                weight,
            };
            await PostToAPI('/api/weight', data, keycloak.token);
        } catch (err) {
            console.log(err);
        }
    };

    const withdrawalList = useMemo(
        () =>
            mockWithdrawals.map((withdrawal) => (
                <WithdrawalSubmission
                    key={withdrawal.id}
                    weight={withdrawal.weight}
                    start={withdrawal.start}
                    end={withdrawal.end}
                    onSubmit={onSubmit}
                />
            )),
        [mockWithdrawals],
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
