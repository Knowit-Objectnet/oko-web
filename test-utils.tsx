import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import keycloak from './src/auth/keycloak';
import theme from './src/theme';
import ModalProvider from './src/components/modal/Provider';
import { GlobalStyle } from './src/global-styles';
import AlertTemplate from 'react-alert-template-basic';
import { QueryClient, QueryClientProvider } from 'react-query';

/*
 * This file sets up the common providers that wraps the application (in `App.tsx`),
 * in order to reduce boilerplate code in tests. It re-exports the React Testing Library,
 * but with a modified render-method that can be used in place of the default render method.
 *
 * Requires that you replace the import in your test files as follows:
 * From `import { ... } from '@testing-library/react';`
 * To:  `import { ... } from 'path/to/this/test-setup';`
 *
 * For more information: https://testing-library.com/docs/react-testing-library/setup#custom-render
 */

const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
};

const queryClient = new QueryClient();

const GlobalProviders: React.FC = ({ children }) => {
    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <QueryClientProvider client={queryClient}>
                        <ModalProvider>
                            {children}
                            <GlobalStyle />
                        </ModalProvider>
                    </QueryClientProvider>
                </AlertProvider>
            </ThemeProvider>
        </ReactKeycloakProvider>
    );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
    render(ui, { wrapper: GlobalProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
