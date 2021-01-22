import * as React from 'react';
import styled from 'styled-components';
import { useAlert, types } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { deletePartner, partnersDefaultQueryKey } from '../api/PartnerService';
import { useMutation, useQueryClient } from 'react-query';
import { PartnerSelect } from './forms/PartnerSelect';
import { NegativeButton } from './buttons/NegativeButton';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
    selectedPartner: yup
        .number()
        .min(0, 'Vennligst velg en samarbeidspartner')
        .required('Vennligst velg en samarbeidspartner')
        .default(-1),
});

interface Props {
    afterSubmit?: (successful: boolean) => void;
}

export const DeletePartner: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const formMethods = useForm({ resolver: yupResolver(validationSchema) });

    const queryClient = useQueryClient();
    const deletePartnerMutation = useMutation((partnerId: number) => deletePartner(partnerId, keycloak.token), {
        onSuccess: () => {
            alert.show('Samarbeidspartneren ble slettet.', { type: types.SUCCESS });
            props.afterSubmit?.(true);
        },
        onError: () => {
            alert.show('Noe gikk galt, samarbeidspartneren ble ikke slettet.', { type: types.ERROR });
            props.afterSubmit?.(false);
        },
        onSettled: () => {
            queryClient.invalidateQueries(partnersDefaultQueryKey);
        },
    });

    const handleDeletePartnerSubmission = formMethods.handleSubmit((data) => {
        deletePartnerMutation.mutate(data.selectedPartner);
    });

    return (
        <Wrapper>
            <Title>Fjern samarbeidspartner</Title>
            <FormProvider {...formMethods}>
                <StyledForm onSubmit={handleDeletePartnerSubmission}>
                    <PartnerSelect />
                    <NegativeButton isLoading={deletePartnerMutation.isLoading}>Slett</NegativeButton>
                </StyledForm>
            </FormProvider>
        </Wrapper>
    );
};
