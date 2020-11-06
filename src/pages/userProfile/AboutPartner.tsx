import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useQuery } from 'react-query';
import { ApiPartner, getPartnerById, partnersDefaultQueryKey } from '../../api/PartnerService';
import { usePartnerById } from '../../api/hooks/usePartnerById';

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
                          <Text>{partnerInfo.description}</Text>
                      </>
                  )}
        </Wrapper>
    );
};
