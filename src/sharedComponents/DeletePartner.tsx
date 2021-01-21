import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useAlert, types } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { deletePartner, partnersDefaultQueryKey } from '../api/PartnerService';
import { useMutation, useQueryClient } from 'react-query';
import { PartnerSelect } from './forms/PartnerSelect';
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

interface Props {
    afterSubmit?: (successful: boolean) => void;
}

export const DeletePartner: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

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

    const [selectedPartnerId, setSelectedPartnerId] = useState<number>();

    const handleDeletePartnerSubmission = (submitEvent: React.FormEvent) => {
        submitEvent.preventDefault();
        if (!selectedPartnerId) {
            // TODO: show this alert as inline error message in form
            alert.show('Vennligst velg en samarbeidspartner.', { type: types.ERROR });
            return;
        }
        deletePartnerMutation.mutate(selectedPartnerId);
    };

    return (
        <Wrapper>
            <Title>Fjern samarbeidspartner</Title>
            <StyledForm onSubmit={handleDeletePartnerSubmission}>
                <PartnerSelect onSelectedPartnerChange={setSelectedPartnerId} selectedPartnerId={selectedPartnerId} />
                <NegativeButton isLoading={deletePartnerMutation.isLoading}>Slett</NegativeButton>
            </StyledForm>
        </Wrapper>
    );
};
