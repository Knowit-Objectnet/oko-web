import React from 'react';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { RouterComponent } from './router/router';
import { GlobalStyle } from './global-styles';
import { SWRConfig } from 'swr';
import { preFetch } from './pre-fetch';

// Pre-fetch data with a token if the user is logged in
const onKeycloakTokens = (tokens: { idToken: string; refreshToken: string; token: string }) => {
    if (tokens.token) {
        preFetch(tokens.token);
    }
};

export const App: React.FC = () => {
    return (
        <>
            <KeycloakProvider keycloak={keycloak} onTokens={onKeycloakTokens}>
                <SWRConfig
                    value={{
                        refreshInterval: 0,
                        revalidateOnFocus: true,
                        revalidateOnReconnect: true,
                    }}
                >
                    <RouterComponent />
                </SWRConfig>
            </KeycloakProvider>
            <GlobalStyle />
        </>
    );
};

export default App;
