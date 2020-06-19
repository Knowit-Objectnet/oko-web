import * as React from "react";
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

export const Login: React.FC<null> = () => {
    // Using array destructuring
    const [keycloak, initialized] = useKeycloak();

    const onButtonClick = () => {
        keycloak.login()
    };

    return (
        <Wrapper>
            <button type="button" onClick={onButtonClick}>
                Login
            </button>
        </Wrapper>
    );
}