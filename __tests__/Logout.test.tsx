import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { Logout } from '../src/pages/logout/Logout';

jest.mock('../src/keycloak');

describe('Provides a logout page', () => {
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

    it('Should show logout text and call logout function', async () => {
        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <Logout />
                </Router>
            </KeycloakProvider>,
        );

        // Check that the logout text is showing while waiting for keycloak to log the user out.
        const message = await findByText('Logger deg ut...');
        expect(message).toBeInTheDocument();

        // Check that the logout function is called on page load.
        expect(keycloak.logout.mock.calls.length).toBe(1);
    });
});
