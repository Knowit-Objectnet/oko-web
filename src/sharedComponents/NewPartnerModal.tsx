import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { types, useAlert } from 'react-alert';
import { Button } from './Button';
import { usePartners } from '../services/usePartners';
import { FetchError } from '../utils/FetchError';
import { PartnerPost } from '../types';

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

const Content = styled.div`
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

interface NewPartnerProps {
    afterSubmit?: (successful: boolean) => void;
}

export const NewPartnerModal: React.FC<NewPartnerProps> = (props) => {
    const alert = useAlert();
    const { addPartner } = usePartners();
    const [name, setName] = useState('');

    // Name input onchange function
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setName(e.currentTarget.value);
    };

    // Submit function for when the new partner is to be submitted to the backend
    const onSubmit = async () => {
        if (!name) {
            alert.show('Navnet kan ikke være tomt.', { type: types.ERROR });
            return;
        }

        // TODO: replace empty data with data from form when form is created
        const newPartner: PartnerPost = {
            name,
            description: '',
            email: '',
            phone: '',
        };

        try {
            await addPartner(newPartner);
            alert.show('Ny partner ble lagt til suksessfullt.', { type: types.SUCCESS });

            if (props.afterSubmit) {
                props.afterSubmit(true);
            }
        } catch (error) {
            if (error instanceof FetchError && error.code === 409) {
                alert.show('En partner med det navnet eksisterer allerede, vennligst velg et annet navn', {
                    type: types.ERROR,
                });
            } else {
                alert.show('Noe gikk galt, ny partner ble ikke lagt til.', { type: types.ERROR });
            }
            if (props.afterSubmit) {
                props.afterSubmit(false);
            }
        }
    };

    return (
        <Wrapper>
            <Title>Legg til ny samarbeidspartner</Title>
            <Content>
                <Input type="text" placeholder="Navn på organisasjonen" value={name} onChange={onNameChange} />
                <Button text="Legg til samarbeidspartner" onClick={onSubmit} color="Green" height={35} />
            </Content>
        </Wrapper>
    );
};
