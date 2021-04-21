import React from 'react';
import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import keycloak from '../../src/auth/keycloak';

import { Logout } from '../../src/pages/Logout';

describe('Provides a logout page', () => {
    it('Should show logout text and call logout function', async () => {
        render(
            <MemoryRouter>
                <Logout />
            </MemoryRouter>,
        );

        // Check that the logout text is showing while waiting for keycloak to log the user out.
        const message = await screen.findByText('Logger ut...');
        expect(message).toBeInTheDocument();

        // Check that the logout function is called on page load.
        expect(keycloak.logout.mock.calls.length).toBe(1);
    });
});
