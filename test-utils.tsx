import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { theme } from './src/theme';
import ModalProvider from './src/components/_deprecated/modal/Provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { mocked } from 'ts-jest/utils';
import { AuthContext, useAuth, UserInfo } from './src/auth/useAuth';

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

const queryClient = new QueryClient();

const GlobalProviders: React.FC = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <ModalProvider>{children}</ModalProvider>
            </QueryClientProvider>
        </ChakraProvider>
    );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
    render(ui, { wrapper: GlobalProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

type MockUseAuthArgs = Partial<UserInfo & Pick<AuthContext, 'logout'>>;

/**
 * Method for initializing a mocked instance of the authorization mechanism used in the application (the `useAuth` hook).
 * Must be called in all tests that renders (sub)components that calls the `useAuth` hook.
 * The mock will be instantiated with default values listed below.
 * To override any of these values, pass an object as argument with the properties you want to override.
 * Remember to call `jest.resetAllMocks()` after running a test calling this method.
 */
export const setupUseAuthMock = ({
    logout = jest.fn(),
    aktorId = undefined,
    isAdmin = false,
    isStasjon = false,
    isPartner = false,
    hasRole = () => false,
    ownsResource = () => false,
}: MockUseAuthArgs = {}): void => {
    const mockedAuthContext = {
        user: {
            aktorId,
            isAdmin,
            isStasjon,
            isPartner,
            hasRole,
            ownsResource,
        },
        logout,
    };

    mocked(useAuth, true).mockReturnValue(mockedAuthContext);
};
