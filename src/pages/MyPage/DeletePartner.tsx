import * as React from 'react';
import styled from 'styled-components';
import { ApiPartner, apiUrl, Colors } from '../../types';
import { useRef, useState } from 'react';
import { useAlert, types } from 'react-alert';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: ${Colors.LightBeige};
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${Colors.LightBeige};
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
    background-color: ${Colors.Red};
    border: none;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
`;

interface NewPartnerProps {
    onSubmit: (id: number) => void;
}

export const DeletePartner: React.FC<NewPartnerProps> = (props) => {
    const alert = useAlert();

    const [selectedPartner, setSelectedPartner] = useState(-1);

    // Valid partners fetched from api
    let { data: partners } = useSWR<ApiPartner[]>(`${apiUrl}/partners`, fetcher);
    partners = partners || [];

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();

        setSelectedPartner(parseInt(e.currentTarget.value));
    };

    const onSubmit = () => {
        if (selectedPartner === -1) {
            alert.show('Vennligst  velg en samarbeidspartner.', { type: types.ERROR });
            return;
        }
        props.onSubmit(selectedPartner);
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
