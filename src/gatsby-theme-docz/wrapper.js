import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '@/theme';
import ModalProvider from '@/sharedComponents/Modal/Provider';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import keycloak from './mockKeycloak';
import { KeycloakProvider } from '@react-keycloak/web';

const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
};

// eslint-disable-next-line react/display-name
export default ({ children }) => (
    <KeycloakProvider keycloak={keycloak}>
        <AlertProvider template={AlertTemplate} {...options}>
            <ThemeProvider theme={theme}>
                <ModalProvider>{children}</ModalProvider>
            </ThemeProvider>
        </AlertProvider>
    </KeycloakProvider>
);
