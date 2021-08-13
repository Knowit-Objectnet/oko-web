import React from 'react';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

interface Props {
    fallback?: React.ReactElement;
}

export const AuthProvider: React.FC<Props> = ({ children, fallback }) => (
    <ReactKeycloakProvider
        authClient={keycloak}
        // The following redirects user to login if not already logged in
        initOptions={{
            onLoad: 'login-required',
        }}
        LoadingComponent={fallback}
    >
        {children}
    </ReactKeycloakProvider>
);
