import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { Login } from '../src/pages/login/Login';

jest.mock('../src/keycloak');

describe('Provides a login page', () => {
    // router history
    let history: MemoryHistory;

    beforeEach(() => {
        history = createMemoryHistory();
    });

    const originalError = console.error;

    beforeAll(() => {
        console.error = (...args: any[]) => {
            if (/Warning.*not wrapped in act/.test(args[0])) {
                return;
            }
            originalError.call(console, ...args);
        };
    });

    afterAll(() => {
        console.error = originalError;
    });

    it('Should show login button and call login function when clicked', async () => {
        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <Login />
                </Router>
            </KeycloakProvider>,
        );

        // Check that the login button should be displayed
        const loginbutton = await findByText('Logg inn');
        expect(loginbutton).toBeInTheDocument();

        await waitFor(() => {
            fireEvent(
                loginbutton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Check that the login function is called on login button click.
        expect(keycloak.login.mock.calls.length).toBe(1);
    });
});
