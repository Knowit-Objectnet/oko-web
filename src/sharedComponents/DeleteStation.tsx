import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useAlert, types } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { deleteStation, stationsDefaultQueryKey } from '../api/StationService';
import { StationSelect } from './forms/StationSelect';
import { NegativeButton } from './buttons/Buttons';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.LightBeige};
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 10px 20px;
    margin-bottom: 25px;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    box-sizing: border-box;
`;

const StyledForm = styled.form`
    padding: 0 35px 35px;
    display: flex;
    flex-direction: column;
`;

interface Props {
    afterSubmit?: (successful: boolean) => void;
}

export const DeleteStation: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const [deleteStationMutation, { isLoading: deleteStationLoading }] = useMutation(
        (stationId: number) => deleteStation(stationId, keycloak.token),
        {
            onSuccess: () => {
                alert.show('Stasjonen ble slettet.', { type: types.SUCCESS });
                props.afterSubmit?.(true);
            },
            onError: () => {
                alert.show('Noe gikk galt, stasjonen ble ikke slettet.', { type: types.ERROR });
                props.afterSubmit?.(false);
            },
            onSettled: () => queryCache.invalidateQueries(stationsDefaultQueryKey),
        },
    );

    const [selectedStationId, setSelectedStationId] = useState<number>();

    const handleDeleteStationSubmission = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedStationId) {
            // TODO: show this alert as inline error message in form
            alert.show('Vennligst velg en stasjon.', { type: types.ERROR });
            return;
        }
        deleteStationMutation(selectedStationId);
    };

    return (
        <Wrapper>
            <Title>Slett stasjon</Title>
            <StyledForm onSubmit={handleDeleteStationSubmission}>
                <StationSelect onSelectedStationChange={setSelectedStationId} selectedStationId={selectedStationId} />
                <NegativeButton isLoading={deleteStationLoading}>Slett</NegativeButton>
            </StyledForm>
        </Wrapper>
    );
};
