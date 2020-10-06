import * as React from 'react';
import styled from 'styled-components';
import { usePartner } from '../../services/usePartner';
import { useKeycloak } from '@react-keycloak/web';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 350px;
    margin-bottom: 45px;
`;

const Title = styled.p`
    font-weight: bold;
    margin-top: 0;
`;

const Text = styled.p`
    font-size: 14px;
`;

export const AboutPartner: React.FC<{ userId: number }> = ({ userId }) => {
    const [keycloak] = useKeycloak();
    const { data: partnerInfo } = usePartner(userId);
    return (
        <Wrapper>
            <Title>Om {partnerInfo ? partnerInfo.name : keycloak.tokenParsed.groups[0] || 'Laster inn...'}</Title>
            <Text>{partnerInfo ? partnerInfo.description : 'Laster inn...'}</Text>
        </Wrapper>
    );
};
