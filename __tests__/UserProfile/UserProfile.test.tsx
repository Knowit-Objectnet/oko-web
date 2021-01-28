import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '../../test-utils';
import '@testing-library/jest-dom';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import keycloak from '../../src/keycloak';
import { UserProfile } from '../../src/pages/userProfile/UserProfile';

describe('Provides a page to view contact info', () => {
    beforeEach(() => {
        // Set the keycloak users credentials
        keycloak.tokenParsed.email = 'test@test.com';
        keycloak.tokenParsed.name = 'Test test';
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render working logout button', async () => {
        const memoryHistory = createMemoryHistory();

        const { findByText } = render(
            <Router history={memoryHistory}>
                <UserProfile />
            </Router>,
        );

        // Find logout button
        const logoutButton = await findByText('Logg ut');
        expect(logoutButton).toBeInTheDocument();

        // Click logout button
        await waitFor(() => {
            fireEvent(
                logoutButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Expect the location to now be /logout as we should've gotten redirected to the logout page
        expect(memoryHistory.location.pathname).toBe('/loggut');
    });

    it("Should render the user's contact info ", async () => {
        const { findByText } = render(
            <MemoryRouter>
                <UserProfile />
            </MemoryRouter>,
        );

        // Find thee name, email and placeholder text for phone number as non is set in the users credentials
        const name = await findByText('Test test');
        const email = await findByText('test@test.com');
        const phonePlaceholderText = await findByText('N/A');

        // Expect name, email and placeholder text to be in document
        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(phonePlaceholderText).toBeInTheDocument();
    });
});
