import * as React from 'react';
import styled from 'styled-components';
import { ApiPartner, apiUrl } from '../types';
import { useState } from 'react';
import { useAlert, types } from 'react-alert';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { DeleteToAPI } from '../utils/DeleteToAPI';
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
    padding: 0px 35px 35px;
    display: flex;
    flex-direction: column;
`;

const Select = styled.select`
    width: 100%;
    min-width: 250px;
    height: 30px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    height: 35px;
    background-color: ${(props) => props.theme.colors.Red};
    border: none;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
`;

interface NewPartnerProps {
    beforeSubmit?: (key: string, id: number) => void;
    afterSubmit?: (successful: boolean, key: string) => void;
}

export const DeletePartner: React.FC<NewPartnerProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Alert instance
    const alert = useAlert();

    const [selectedPartner, setSelectedPartner] = useState(-1);

    // Valid partners fetched from api
    let { data: partners } = useSWR<ApiPartner[]>(`${apiUrl}/partners`, fetcher);
    partners = partners || [];

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();

        setSelectedPartner(parseInt(e.currentTarget.value));
    };

    const onSubmit = async () => {
        if (selectedPartner === -1) {
            alert.show('Vennligst  velg en samarbeidspartner.', { type: types.ERROR });
            return;
        }

        try {
            if (props.beforeSubmit) {
                props.beforeSubmit(`${apiUrl}/partners/${selectedPartner}`, selectedPartner);
            }

            await DeleteToAPI(`${apiUrl}/partners/${selectedPartner}`, keycloak.token);

            if (props.afterSubmit) {
                props.afterSubmit(true, `${apiUrl}/partners/${selectedPartner}`);
            }
        } catch (err) {
            if (props.afterSubmit) {
                props.afterSubmit(false, `${apiUrl}/partners/${selectedPartner}`);
            }
        }
    };

    return (
        <Wrapper>
            <Title>Fjern samarbeidspartner</Title>
            <Content>
                <Select value={selectedPartner} onChange={onChange}>
                    <option value={-1} disabled>
                        Velg samarbeidspartner
                    </option>
                    {partners.map((partner) => (
                        <option value={partner.id} key={partner.id}>
                            {partner.name}
                        </option>
                    ))}
                </Select>
                <Button type="submit" onClick={onSubmit}>
                    Slett
                </Button>
            </Content>
        </Wrapper>
    );
};
