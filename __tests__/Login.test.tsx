import React from 'react';
import { render } from '../test-utils';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import keycloak from '../src/keycloak';

import { Login } from '../src/pages/login/Login';

describe('Provides a login page', () => {
    it('Should show login button and call login function when clicked', async () => {
        const { findByText } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>,
        );

        // Check that the login text is showing while waiting for keycloak to log the user in.
        const message = await findByText('Logger deg inn...');
        expect(message).toBeInTheDocument();

        // Check that the login function is called on login button click.
        expect(keycloak.login.mock.calls.length).toBe(1);
    });
});
