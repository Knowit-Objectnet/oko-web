import React from 'react';
import {
    render, wait, fireEvent,
} from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import {createMemoryHistory, MemoryHistory} from 'history';

import { CalendarPage } from "../../src/pages/calendar/Calendar";

global.fetch = fetch;

describe('Provides a page to view the calendar in addition to change log and notifications', () => {
    // router history
    let history: MemoryHistory;

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
                    start: new Date(),
                    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                    text: 'Tar ikke i mot barneleker ifm. Covid-19 tiltak.',
                },
            }
        }
    ];

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async ({ url }) => {
            if(url == 'keycloak.json') {
                return JSON.stringify({
                    url: '/auth',
                    realm: 'myrealm',
                    clientId: 'myapp'
                });
            } else if (url.startsWith("/api/calendar/events/")) {
                return JSON.stringify(mockEvents);
            }
            else if (['/api/notifications', '/api/locations', '/api/log/changes'].includes(url)) {
                return JSON.stringify([]);
            }
            return '';
        })
        history = createMemoryHistory();
    });

    const originalError = console.error

    beforeAll(() => {
        console.error = (...args: any[]) => {
            if (/Warning.*not wrapped in act/.test(args[0])) {
                return
            }
            originalError.call(console, ...args)
        }
    })

    afterAll(() => {
        console.error = originalError
    });

    it('Should render without errors', async () => {
        render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <CalendarPage />
                </Router>
            </KeycloakProvider>
        );
    });

    it('Should show Event on event click', async () => {

    });

    it('Should show NewEvent on calendar click', async () => {

    });

    it('Should show NewEvent on new event button click', async () => {

    });
});