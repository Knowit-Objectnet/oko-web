import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { apiUrl } from '../types';
import { types, useAlert } from 'react-alert';
import { useStations } from '../services/useStations';

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
    const alert = useAlert();
    const { data: locations, deleteStation } = useStations();

    const [selectedLocation, setSelectedLocation] = useState(-1);

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

            await deleteStation(selectedLocation);

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
                    {(locations ?? []).map((location) => (
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
