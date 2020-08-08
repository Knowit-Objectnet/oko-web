import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: xxx-large;
`;

/**
 * Login component that redirects to keycloak for login
 */
export const Login: React.FC = () => {
    // Getting Keycloak instance
    const { keycloak } = useKeycloak();

    useEffect(() => {
        keycloak.login();
    });

    return (
        <>
            <Helmet>
                <title>Innlogging</title>
            </Helmet>
            <Wrapper>Logger deg inn...</Wrapper>
        </>
    );
};
