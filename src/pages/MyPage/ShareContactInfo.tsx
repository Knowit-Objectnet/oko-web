import * as React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { useState } from 'react';
import { Colors } from '../../types';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 350px;
    margin-top: 45px;
`;

const Title = styled.p`
    font-weight: bold;
`;

const Text = styled.p`
    font-size: 14px;
`;

const Sharing = styled.div`
    display: flex;
    margin-top: 15px;
`;

const SharingText = styled.div`
    font-weight: bold;
    margin-right: 20px;
`;

/**
 * Share Contact info component
 */
export const ShareContactInfo: React.FC = () => {
    const [shared, setShared] = useState(false);

    const onChange = () => {
        setShared(!shared);
    };

    return (
        <Wrapper>
            <Title>Kontaktinformasjon</Title>
            <Text>
                Vil dere dele kontaktinformasjonen til de andre samarbeidspartnerne for å øke samarbeidet rundt ombruk?
            </Text>
            <Sharing>
                <SharingText>Deling</SharingText>
                <Switch checked={shared} onChange={onChange} onColor={Colors.DarkBlue} />
            </Sharing>
        </Wrapper>
    );
};
