import React from 'react';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { RouterComponent } from './router/router';
import { GlobalStyle } from './global-styles';
import { SWRConfig } from 'swr';
import ModalProvider from './sharedComponents/Modal/Provider';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { Helmet } from 'react-helmet';

const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
};

export const App: React.FC = () => {
    return (
        <KeycloakProvider keycloak={keycloak}>
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <ModalProvider>
                        <SWRConfig
                            value={{
                                refreshInterval: 0,
                                revalidateOnFocus: true,
                                revalidateOnReconnect: true,
                            }}
                        >
                            <Helmet titleTemplate="Oslo kommune REG | %s">
                                <html lang="no" />
                                <meta name="description" content="Oslo kommune REG" />
                            </Helmet>
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
