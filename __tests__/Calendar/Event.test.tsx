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
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides an interface to view and edit an Event', () => {
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
        const deleteEvent = jest.fn();
        const updatevent = jest.fn();

        const { findByText } = render(
            <AlertProvider template={AlertTemplate} {...options}>
                <KeycloakProvider keycloak={keycloak}>
                    <Router history={history}>
                        <Event {...mockEvents[0]} deleteEvent={deleteEvent} updateEvent={updatevent} />
                    </Router>
                </KeycloakProvider>
            </AlertProvider>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        expect(title.parentElement?.children.length).toBe(2);
    });

    it('Should not show edit symbol on Event if user is not logged in', async () => {
        const deleteEvent = jest.fn();
        const updatevent = jest.fn();

        // Change the keycloak instance to be logged out
        keycloak.authenticated = false;

        const { findByText } = render(
            <AlertProvider template={AlertTemplate} {...options}>
                <KeycloakProvider keycloak={keycloak}>
                    <Router history={history}>
                        <Event {...mockEvents[0]} deleteEvent={deleteEvent} updateEvent={updatevent} />
                    </Router>
                </KeycloakProvider>
            </AlertProvider>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        expect(title.parentElement?.children.length).toBe(1);
    });
});
