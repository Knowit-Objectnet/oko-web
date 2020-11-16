import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { KeycloakProvider } from '@react-keycloak/web';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import keycloak from '../src/keycloak';
import theme from '../src/theme';
import ModalProvider from '../src/sharedComponents/Modal/Provider';
import { GlobalStyle } from '../src/global-styles';
import AlertTemplate from 'react-alert-template-basic';

/** This file sets up the common providers that wraps the real application (in `App.tsx`)
 * It re-exports the React Testing Library, but with a modified render-method that can be
 * used in place of the default render method.
 *
 * Requires that you replace the import in your test files as follows:
 * From `import { ... } from '@testing-library/react';`
 * To:  `import { ... } from 'path/to/this/test-setup';`
 *
 * For more information: https://testing-library.com/docs/react-testing-library/setup#custom-render */

const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
};

const GlobalProviders: React.FC = ({ children }) => {
    return (
        <KeycloakProvider keycloak={keycloak}>
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <ModalProvider>
                        {children}
                        <GlobalStyle />
                    </ModalProvider>
                </AlertProvider>
            </ThemeProvider>
        </KeycloakProvider>
    );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
    render(ui, { wrapper: GlobalProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
