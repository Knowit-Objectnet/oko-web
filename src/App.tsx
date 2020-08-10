import React from 'react';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { RouterComponent } from './router/router';
import { GlobalStyle } from './global-styles';
import { SWRConfig } from 'swr';
import { preFetch } from './pre-fetch';
import ModalProvider from './sharedComponents/Modal/Provider';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

// Pre-fetch data with a token if the user is logged in
const onKeycloakTokens = (tokens: { idToken: string; refreshToken: string; token: string }) => {
    if (tokens.token) {
        preFetch(tokens.token);
    }
};

const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
};

export const App: React.FC = () => {
    return (
        <KeycloakProvider keycloak={keycloak} onTokens={onKeycloakTokens}>
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...options}>
                    <ModalProvider>
                        <SWRConfig
                            value={{
                                refreshInterval: 0,
                                revalidateOnFocus: true,
                                revalidateOnReconnect: true,
                            }}
                        >
                            <RouterComponent />
                            <GlobalStyle />
                        </SWRConfig>
                    </ModalProvider>
                </AlertProvider>
            </ThemeProvider>
        </KeycloakProvider>
    );
};

export default App;
