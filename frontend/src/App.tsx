import React from 'react';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { RouterComponent } from './router/router';
import { GlobalStyle } from './global-styles';

export const App: React.FC = () => {
    return (
        <>
            <KeycloakProvider keycloak={keycloak}>
                <RouterComponent />
            </KeycloakProvider>
            <GlobalStyle />
        </>
    );
};

export default App;
