import React from 'react';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

export const AuthProvider: React.FC = ({ children }) => (
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
            onLoad: 'login-required',
        }}
    >
        {children}
    </ReactKeycloakProvider>
);
