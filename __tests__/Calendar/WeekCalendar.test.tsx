import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';
import fetch from 'jest-fetch-mock';

import { WeekCalendar } from '../../src/pages/calendar/WeekCalendar';
import { Roles } from '../../src/types';
import { mockEvents } from '../../__mocks__/mockEvents';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('', () => {
    // router history
    let history: MemoryHistory;

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async ({ url }) => {
            if (url.startsWith('/api/calendar/events/')) {
                return JSON.stringify(mockEvents);
            } else if (['/api/notifications', '/api/log/changes', '/api/categories'].includes(url)) {
                return JSON.stringify([]);
            } else if (url === '/api/locations') {
                return JSON.stringify(['grønmo', 'haraldrud', 'smestad']);
            }
            return '';
        });
        history = createMemoryHistory();
    });

    afterEach(() => {
        cleanup();
    });

    it('Should show location selector if role is Oslo', async () => {
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });

        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <WeekCalendar />
                </Router>
            </KeycloakProvider>,
        );

        // Find the location selectors
        const groenmo = await findByText('Grønmo');
        const haraldrud = await findByText('Haraldrud');
        const smestad = await findByText('Smestad');
        expect(groenmo).toBeInTheDocument();
        expect(haraldrud).toBeInTheDocument();
        expect(smestad).toBeInTheDocument();
    });

    it('Should not show location selector if role is not Oslo', async () => {
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return false;
        });

        const { queryByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <WeekCalendar />
                </Router>
            </KeycloakProvider>,
        );

        // Find the location selectors
        const groenmo = await queryByText('Grønmo');
        const haraldrud = await queryByText('Haraldrud');
        const smestad = await queryByText('Smestad');
        expect(groenmo).not.toBeInTheDocument();
        expect(haraldrud).not.toBeInTheDocument();
        expect(smestad).not.toBeInTheDocument();
    });
});
