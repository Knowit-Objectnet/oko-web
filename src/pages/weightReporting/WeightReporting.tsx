import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

/**
 * Weight reporting component for reporting weight from item withdrawals
 */
export const Logout: React.FC = () => {
    // Getting Keycloak instance
    const { keycloak } = useKeycloak();

    return (
        <Wrapper>

        </Wrapper>
    );
};
