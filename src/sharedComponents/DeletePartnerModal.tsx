import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { types, useAlert } from 'react-alert';
import { usePartners } from '../services/usePartners';

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

interface DeletePartnerProps {
    afterSubmit?: (successful: boolean) => void;
}

export const DeletePartnerModal: React.FC<DeletePartnerProps> = (props) => {
    const alert = useAlert();
    const { data: partners, deletePartner } = usePartners();
    const [selectedPartner, setSelectedPartner] = useState(-1);

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
            await deletePartner(selectedPartner);

            alert.show('Samarbeidspartneren ble slettet suksessfullt.', { type: types.SUCCESS });

            if (props.afterSubmit) {
                props.afterSubmit(true);
            }
        } catch (err) {
            alert.show('Noe gikk galt, samarbeidspartneren ble ikke slettet.', { type: types.ERROR });

            if (props.afterSubmit) {
                props.afterSubmit(false);
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
                    {partners?.map((partner) => (
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
