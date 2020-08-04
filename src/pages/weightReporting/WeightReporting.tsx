import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';
import { WithdrawalSubmission } from './WithdrawalSubmission';
import { apiUrl, Colors, Withdrawal, ApiLocation } from '../../types';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { Loading } from '../../sharedComponents/Loading';
import { PatchToAPI } from '../../utils/PatchToAPI';
import { useAlert, types } from 'react-alert';

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
`;

interface LatestProps {
    isEmpty: boolean;
}

const Latest = styled.div<LatestProps>`
    margin-top: 65px;
    width: 100%;
    min-height: ${(props) => (props.isEmpty ? '50px' : '150px')};
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const Older = styled.div`
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

    // List of withdrawals fetched from the server
    const { data: apiWithdrawals, isValidating: isValidatingWithdrawals, mutate } = useSWR<Array<Withdrawal>>(
        [`${apiUrl}/reports/?partnerId=${keycloak.tokenParsed.GroupID}`, keycloak.token],
        fetcher,
    );
    // List of withdrawals transformed from the Api fetch
    const [withdrawals, setWithdrawals] = useState<Array<Withdrawal> | null>(null);

    // List of stations fetched from the server
    const { data: locations, isValidating: isValidatingLocations } = useSWR<Array<ApiLocation>>(
        [`${apiUrl}/stations`, keycloak.token],
        fetcher,
    );

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
            // Update the state
            setWithdrawals(_withdrawals);
        }
    }, [apiWithdrawals]);

    const onSubmit = React.useCallback(
        async (weight: number, id: number) => {
            try {
                if (withdrawals) {
                    // update the local data immediately, but disable the revalidation
                    const newWithdrawal = withdrawals.find((withdrawal) => withdrawal.reportID === id);
                    if (newWithdrawal) {
                        newWithdrawal.weight = weight;
                        mutate([...withdrawals], false);

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
        [withdrawals],
    );

    // Create a list of memoized elements such that we don't need to rerender every list element
    // when one gets updated
    const withdrawalList =
        withdrawals &&
        withdrawals
            .filter((withdrawal) => withdrawal.weight)
            .map((withdrawal) => (
                <WithdrawalSubmission
                    key={withdrawal.reportID}
                    id={withdrawal.reportID}
                    weight={withdrawal.weight}
                    start={withdrawal.startDateTime}
                    end={withdrawal.endDateTime}
                    location={withdrawal.stationID}
                    locations={locations}
                    onSubmit={onSubmit}
                />
            ));

    const notReportedList =
        withdrawals &&
        withdrawals
            .filter((withdrawal) => !withdrawal.weight)
            .map((withdrawal) => (
                <WithdrawalSubmission
                    key={withdrawal.reportID}
                    id={withdrawal.reportID}
                    weight={withdrawal.weight}
                    start={withdrawal.startDateTime}
                    end={withdrawal.endDateTime}
                    location={withdrawal.stationID}
                    locations={locations}
                    onSubmit={onSubmit}
                />
            ));

    return (
        <Wrapper>
            {!withdrawals && !locations && isValidatingWithdrawals && isValidatingLocations ? (
                <Loading text="Laster inn data..." />
            ) : (
                <Content>
                    <Latest isEmpty={notReportedList === undefined || notReportedList?.length === 0}>
                        <h2>Ikke rapportert</h2>
                        <OverflowWrapper>{notReportedList}</OverflowWrapper>
                    </Latest>
                    <Older>
                        <h2>Tidligere uttak</h2>
                        <OverflowWrapper>{withdrawalList}</OverflowWrapper>
                    </Older>
                </Content>
            )}
        </Wrapper>
    );
};
