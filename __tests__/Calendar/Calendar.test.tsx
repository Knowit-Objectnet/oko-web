import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import fetch from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { CalendarPage } from '../../src/pages/calendar/Calendar';
import { Roles } from '../../src/types';
import { mockEvents } from '../../__mocks__/mockEvents';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides a page to view the calendar in addition to change log and notifications', () => {
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

    it('Should render without errors', async () => {
        render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <CalendarPage />
                </Router>
            </KeycloakProvider>,
        );
    });

    it('Should show NewEvent on new event button click if role is Oslo', async () => {
        // Set our role to Oslo
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });

        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <CalendarPage />
                </Router>
            </KeycloakProvider>,
        );

        const button = await findByText('Legg til avtale');
        expect(button).toBeInTheDocument();

        await waitFor(() => {
            fireEvent(
                button,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        const title = await findByText('Opprett ny avtale');
        expect(title).toBeInTheDocument();
    });
});
