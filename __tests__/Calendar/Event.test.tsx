import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { Event } from '../../src/pages/calendar/events/Event';
import { mockEvents } from '../../__mocks__/mockEvents';
import fetch from 'jest-fetch-mock';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides an interface to view and edit an Event', () => {
    // router history
    let history: MemoryHistory;

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async ({ url }) => {
            if (url.startsWith('/api/calendar/events/')) {
                return JSON.stringify(mockEvents);
            } else if (['/api/notifications', '/api/locations', '/api/log/changes', '/api/categories'].includes(url)) {
                return JSON.stringify([]);
            }
            return '';
        });
        history = createMemoryHistory();
    });

    afterEach(() => {
        cleanup();
    });

    it('Should only show edit symbol on Event if user is logged in', async () => {
        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <Event {...mockEvents[0]} />
                </Router>
            </KeycloakProvider>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        expect(title.parentElement?.children.length).toBe(2);
    });

    it('Should not show edit symbol on Event if user is not logged in', async () => {
        // Change the keycloak instance to be logged out
        keycloak.authenticated = false;

        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <Event {...mockEvents[0]} />
                </Router>
            </KeycloakProvider>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        expect(title.parentElement?.children.length).toBe(1);
    });
});
