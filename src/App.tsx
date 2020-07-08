import React from 'react';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { RouterComponent } from './router/router';
import { GlobalStyle } from './global-styles';
import { SWRConfig } from 'swr';

export const App: React.FC = () => {
    return (
        <>
            <KeycloakProvider keycloak={keycloak}>
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
