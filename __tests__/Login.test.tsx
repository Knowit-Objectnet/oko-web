import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { Login } from '../src/pages/login/Login';

describe('Provides a login page', () => {
    // router history
    let history: MemoryHistory;

    beforeEach(() => {
        history = createMemoryHistory();
    });

    it('Should show login button and call login function when clicked', async () => {
        const { findByText } = render(
            <ReactKeycloakProvider authClient={keycloak}>
                <Router history={history}>
                    <Login />
                </Router>
            </ReactKeycloakProvider>,
        );

        // Check that the login text is showing while waiting for keycloak to log the user in.
        const message = await findByText('Logger deg inn...');
        expect(message).toBeInTheDocument();

        // Check that the login function is called on login button click.
        expect(keycloak.login.mock.calls.length).toBe(1);
    });
});
