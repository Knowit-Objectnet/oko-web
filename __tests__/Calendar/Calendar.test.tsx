import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { CalendarPage } from '../../src/pages/calendar/Calendar';
import { Roles } from '../../src/types';

/* For some god forsaken reason this needs to be imported to replace the global promise
 * as multiple different libraries using their own version of promise makes everything
 * boil, explode, make my will to live disappear, and make the keycloak mock not work
 */
global.Promise = jest.requireActual('promise');

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

// Keycloak mock to intercept function calls
jest.mock('../../src/keycloak', () => ({
    __esModule: true,
    default: {
        constructor: jest.fn(),
        init: jest.fn(),
        login: jest.fn(),
        createLoginUrl: jest.fn(),
        logout: jest.fn(),
        createLogoutUrl: jest.fn(),
        register: jest.fn(),
        createRegisterUrl: jest.fn(),
        createAccountUrl: jest.fn(),
        accountManagement: jest.fn(),
        hasRealmRole: jest.fn((role: string) => {
            return role === Roles.Oslo;
        }),
        hasResourceRole: jest.fn(),
        loadUserProfile: jest.fn(),
        loadUserInfo: jest.fn(),
        isTokenExpired: jest.fn(),
        updateToken: jest.fn(),
        clearToken: jest.fn(),
    },
}));

describe('Provides a page to view the calendar in addition to change log and notifications', () => {
    // router history
    let history: MemoryHistory;
    const d = new Date();
    const monday = new Date(d.setDate(d.getDate() - d.getDay() + (d.getDay() == 0 ? -6 : 1)));
    const mockEvents = [
        {
            title: 'Test',
            start: new Date(new Date().setHours(10)),
            end: new Date(new Date().setHours(12)),
            allDay: false,
            resource: {
                location: 'grønmo',
                driver: 'odd',
                weight: 100,
                message: {
                    start: new Date(monday.setHours(12)),
                    end: new Date(monday.setHours(13)),
                    text: 'Tar ikke i mot barneleker ifm. Covid-19 tiltak.',
                },
            },
        },
    ];

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

    const originalError = console.error;

    beforeAll(() => {
        console.error = (...args: any[]) => {
            if (/Warning.*not wrapped in act/.test(args[0])) {
                return;
            }
            originalError.call(console, ...args);
        };
    });

    afterAll(() => {
        console.error = originalError;
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

    it('Should show Event on event click', async () => {
        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <CalendarPage />
                </Router>
            </KeycloakProvider>,
        );

        // Find the event by it's title text
        const event = await findByText(mockEvents[0].title);
        expect(event).toBeInTheDocument();

        // Click the event element
        await waitFor(() => {
            fireEvent(
                event,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Find the message text inside the event and expect that it is in the document
        const message = await findByText(mockEvents[0].resource.message.text);
        expect(message).toBeInTheDocument();
    });

    it('Should show NewEvent on new event button click', async () => {
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
