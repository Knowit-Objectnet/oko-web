import * as React from 'react';
import styled from 'styled-components';
import { apiUrl } from '../types';
import { useState } from 'react';
import { useAlert, types } from 'react-alert';
import { Button } from './Button';
import { PostToAPI } from '../utils/PostToAPI';
import { useKeycloak } from '@react-keycloak/web';

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
    beforeSubmit?: (key: string, name: string) => void;
    afterSubmit?: (successful: boolean, key: string, error: Error | null) => void;
}

export const NewPartner: React.FC<NewPartnerProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Alert instance
    const alert = useAlert();
    // General info state
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

        const data: { name: string; contract?: File } = {
            name,
        };

        try {
            if (props.beforeSubmit) {
                props.beforeSubmit(`${apiUrl}/partners/`, name);
            }

            await PostToAPI(`${apiUrl}/partners/`, data, keycloak.token);

            if (props.afterSubmit) {
                props.afterSubmit(true, `${apiUrl}/partners/`, null);
            }
        } catch (err) {
            if (props.afterSubmit) {
                props.afterSubmit(false, `${apiUrl}/partners/`, err);
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
