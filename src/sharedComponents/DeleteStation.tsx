import * as React from 'react';
import styled from 'styled-components';
import { useAlert, types } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { deleteStation, stationsDefaultQueryKey } from '../api/StationService';
import { StationSelectNew } from './forms/StationSelectNew';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NegativeButton } from './buttons/NegativeButton';

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

const validationSchema = yup.object().shape({
    selectedStation: yup.number().min(0, 'Vennligst velg en stasjon').required('Vennligst velg en stasjon').default(-1),
});

interface Props {
    afterSubmit?: (successful: boolean) => void;
}

export const DeleteStation: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const formMethods = useForm({ resolver: yupResolver(validationSchema) });

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

    const handleDeleteStationSubmission = formMethods.handleSubmit((data) =>
        deleteStationMutation(data.selectedStation),
    );

    return (
        <Wrapper>
            <Title>Slett stasjon</Title>
            <FormProvider {...formMethods}>
                <StyledForm onSubmit={handleDeleteStationSubmission}>
                    <StationSelectNew />
                    <NegativeButton type="submit" isLoading={deleteStationLoading}>
                        Slett
                    </NegativeButton>
                </StyledForm>
            </FormProvider>
        </Wrapper>
    );
};
