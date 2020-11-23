import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useAlert, types } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { ApiPartnerPost, partnersDefaultQueryKey, postPartner } from '../api/PartnerService';
import { PositiveButton } from './buttons/Buttons';

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
    padding: 0 50px 50px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 350px;
    height: 45px;
    margin-bottom: 20px;

    &::placeholder {
        text-align: center;
    }
`;

interface Props {
    afterSubmit?: (successful: boolean) => void;
}

export const NewPartner: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const [addPartnerMutation, { isLoading: addPartnerLoading }] = useMutation(
        (newPartner: ApiPartnerPost) => postPartner(newPartner, keycloak.token),
        {
            onSuccess: () => {
                alert.show('Ny partner ble lagt til.', { type: types.SUCCESS });
                props.afterSubmit?.(true);
            },
            onError: () => {
                alert.show('Noe gikk galt, ny partner ble ikke lagt til.', { type: types.ERROR });
                props.afterSubmit?.(false);
            },
            onSettled: () => queryCache.invalidateQueries(partnersDefaultQueryKey),
        },
    );

    const [name, setName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setName(e.currentTarget.value);
    };

    const handleNewPartnerSubmission = (submitEvent: React.FormEvent) => {
        submitEvent.preventDefault();
        if (!name) {
            alert.show('Navnet kan ikke være tomt.', { type: types.ERROR });
            return;
        }
        const newPartner: ApiPartnerPost = {
            name,
        };
        addPartnerMutation(newPartner);
    };

    return (
        <Wrapper>
            <Title>Legg til ny samarbeidspartner</Title>
            <StyledForm onSubmit={handleNewPartnerSubmission}>
                <Input type="text" placeholder="Navn på organisasjonen" value={name} onChange={handleNameChange} />
                <PositiveButton isLoading={addPartnerLoading}>Legg til samarbeidspartner</PositiveButton>
            </StyledForm>
        </Wrapper>
    );
};
