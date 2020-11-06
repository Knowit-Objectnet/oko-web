import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { usePartnerById } from '../../api/hooks/usePartnerById';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 350px;
    margin-bottom: 45px;
`;

const Title = styled.h3`
    font-weight: bold;
    margin-top: 0;
`;

export const AboutPartner: React.FC = () => {
    const [keycloak] = useKeycloak();
    const userId: number = keycloak.tokenParsed?.GroupID;

    const { data: partnerInfo, isLoading } = usePartnerById(userId);

    return (
        <Wrapper>
            {!partnerInfo && isLoading
                ? 'Laster inn...'
                : partnerInfo && (
                      <>
                          <Title>Om {partnerInfo.name}</Title>
                          <p>{partnerInfo.description}</p>
                      </>
                  )}
        </Wrapper>
    );
};
