import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

/**
 * Login component that redirects to keycloak for login
 */
export const Login: React.FC = () => {
    // Getting Keycloak instance
    const { keycloak } = useKeycloak();

    const onButtonClick = () => {
        keycloak.login();
    };

    return (
        <Wrapper>
            <button type="button" onClick={onButtonClick}>
                Logg inn
            </button>
        </Wrapper>
    );
};
