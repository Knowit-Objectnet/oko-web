import React from 'react';
import { render } from '../test-utils';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import keycloak from '../src/keycloak';

import { Logout } from '../src/pages/logout/Logout';

describe('Provides a logout page', () => {
    it('Should show logout text and call logout function', async () => {
        const { findByText } = render(
            <MemoryRouter>
                <Logout />
            </MemoryRouter>,
        );

        // Check that the logout text is showing while waiting for keycloak to log the user out.
        const message = await findByText('Logger ut...');
        expect(message).toBeInTheDocument();

        // Check that the logout function is called on page load.
        expect(keycloak.logout.mock.calls.length).toBe(1);
    });
});
