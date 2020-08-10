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

export const DeleteLocation: React.FC<NewPartnerProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Alert instance
    const alert = useAlert();

    const [selectedLocation, setSelectedLocation] = useState(-1);

    // Valid partners fetched from api
    let { data: locations } = useSWR<ApiPartner[]>(`${apiUrl}/stations`, fetcher);
    locations = locations || [];

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();

        setSelectedLocation(parseInt(e.currentTarget.value));
    };

    const onSubmit = async () => {
        if (selectedLocation === -1) {
            alert.show('Vennligst velg en stasjon.', { type: types.ERROR });
            return;
        }

        try {
            if (props.beforeSubmit) {
                props.beforeSubmit(`${apiUrl}/stations/${selectedLocation}`, selectedLocation);
            }

            await DeleteToAPI(`${apiUrl}/stations/${selectedLocation}`, keycloak.token);

            if (props.afterSubmit) {
                props.afterSubmit(true, `${apiUrl}/stations/${selectedLocation}`);
            }
        } catch (err) {
            if (props.afterSubmit) {
                props.afterSubmit(false, `${apiUrl}/stations/${selectedLocation}`);
            }
        }
    };

    return (
        <Wrapper>
            <Title>Fjern stasjon</Title>
            <Content>
                <Select value={selectedLocation} onChange={onChange}>
                    <option value={-1} disabled>
                        Velg stasjon
                    </option>
                    {locations.map((location) => (
                        <option value={location.id} key={location.id}>
                            {location.name}
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
