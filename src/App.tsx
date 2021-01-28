import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { MainRouter } from './router/MainRouter';
import { GlobalStyle } from './global-styles';
import ModalProvider from './sharedComponents/Modal/Provider';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider } from 'react-query';

const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
};

const queryClient = new QueryClient();

export const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ReactKeycloakProvider
                authClient={keycloak}
                initOptions={{
                    onLoad: 'login-required',
                }}
            >
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <QueryClientProvider client={queryClient}>
                        <ModalProvider>
                            <Helmet titleTemplate="Oslo kommune REG | %s">
                                <html lang="no" />
                                {/* TODO write a SEO-friendly description: */}
                                <meta name="description" content="Oslo kommune REG" />{' '}
                            </Helmet>
                            <MainRouter />
                        </ModalProvider>
                    </QueryClientProvider>
                </AlertProvider>
            </ReactKeycloakProvider>
        </ThemeProvider>
    );
};

export default App;
