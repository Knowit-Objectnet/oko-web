import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { Calendar } from '../../src/pages/calendar/Calendar';
import { mockApiEvents } from '../../__mocks__/mockEvents';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { apiUrl } from '../../src/types';
import { mockLocations } from '../../__mocks__/mockLocations';
import ModalProvider from '../../src/sharedComponents/Modal/Provider';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides a page to view the calendar', () => {
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
        fetch.resetMocks();
        fetch.mockResponse(async ({ url }) => {
            if (url.startsWith(`${apiUrl}/events`)) {
                return JSON.stringify(mockApiEvents);
            } else if (url.startsWith(`${apiUrl}/locations`)) {
                return JSON.stringify(mockLocations);
            } else {
                return JSON.stringify([]);
            }
        });
        history = createMemoryHistory();
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render without errors', async () => {
        render(
            <AlertProvider template={AlertTemplate} {...options}>
                <ModalProvider>
                    <KeycloakProvider keycloak={keycloak}>
                        <Router history={history}>
                            <Calendar />
                        </Router>
                    </KeycloakProvider>
                </ModalProvider>
            </AlertProvider>,
        );
    });
});
