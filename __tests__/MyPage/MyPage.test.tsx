import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { MyPage } from '../../src/pages/MyPage/MyPage';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ModalProvider from '../../src/sharedComponents/Modal/Provider';

describe('Provides a page to view the calendar in addition to change log and notifications', () => {
    // router history
    let history: MemoryHistory;

    // Alert options
    const options = {
        position: positions.TOP_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
    };

    beforeEach(() => {
        history = createMemoryHistory();

        // Set the keycloak users credentials
        keycloak.tokenParsed.email = 'test@test.com';
        keycloak.tokenParsed.name = 'Test test';
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render working logout button', async () => {
        const { findByText } = render(
            <AlertProvider template={AlertTemplate} {...options}>
                <ModalProvider>
                    <KeycloakProvider keycloak={keycloak}>
                        <Router history={history}>
                            <MyPage />
                        </Router>
                    </KeycloakProvider>
                </ModalProvider>
            </AlertProvider>,
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
        expect(history.location.pathname).toBe('/logout');
    });

    it("Should render the user's contact info ", async () => {
        const { findByText } = render(
            <AlertProvider template={AlertTemplate} {...options}>
                <ModalProvider>
                    <KeycloakProvider keycloak={keycloak}>
                        <Router history={history}>
                            <MyPage />
                        </Router>
                    </KeycloakProvider>
                </ModalProvider>
            </AlertProvider>,
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
