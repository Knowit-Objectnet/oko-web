import React from 'react';
import '@testing-library/jest-dom';
import { setupUseAuthMock, render, screen } from '../../test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Logout } from '../../src/pages/Logout';

describe('Provides a logout page', () => {
    it('Should show logout text and call logout function', async () => {
        const logoutFunction = jest.fn();
        setupUseAuthMock({ logout: logoutFunction });

        render(
            <MemoryRouter>
                <Logout />
            </MemoryRouter>,
        );

        // Check that the logout text is showing while waiting for keycloak to log the user out.
        const message = await screen.findByText('Logger ut...');
        expect(message).toBeInTheDocument();

        // Check that the logout function is called on page load.
        expect(logoutFunction).toHaveBeenCalledTimes(1);
    });
});
