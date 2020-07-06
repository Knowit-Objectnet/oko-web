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

    it('Should show NewEvent on slot click if role is Oslo', async () => {
        // Set our role to Oslo
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });
        const wrapper = mount(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <CalendarPage />
                </Router>
            </KeycloakProvider>,
        );

        const now = new Date();
        const date = new Date();

        const slotInfo = {
            start: new Date(date.setHours(now.getHours() + 1, 0)),
            end: new Date(date.setHours(now.getHours() + 2, 0)),
            slots: date,
            action: 'click',
        };

        // Get calendar
        const calendar = wrapper.find('.rbc-calendar');
        // call the onSelectSlot function (the function that gets called on calendar click)
        //console.log(calendar.children().props())
        calendar.children().props().onSelectSlot(slotInfo);
        // Update the wrapper to render the modal
        wrapper.update();
        // Find the header of the modal and check that 1 and only 1 exists
        const newEvent = wrapper.find('h2[children="Opprett ny avtale"]');
        //console.log(wrapper.debug())
        expect(newEvent.length).toBe(1);
    });

    it('Should show ExtraEvent on slot click if role is Partner or Ambassador', async () => {
        // Set our role to Partner or Ambassador
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Partner || role === Roles.Ambassador;
        });
        const wrapper = mount(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <CalendarPage />
                </Router>
            </KeycloakProvider>,
        );

        const now = new Date();
        const date = new Date();

        const slotInfo = {
            start: new Date(date.setHours(now.getHours() + 1, 0)),
            end: new Date(date.setHours(now.getHours() + 2, 0)),
            slots: date,
            action: 'click',
        };

        // Get calendar
        const calendar = wrapper.find('.rbc-calendar');
        // call the onSelectSlot function (the function that gets called on calendar click)
        calendar.children().props().onSelectSlot(slotInfo);
        // Update the wrapper to render the modal
        wrapper.update();
        // Find the header of the ExtraEvent modal and check that 1 and only 1 exists
        const newEvent = wrapper.find('h2[children="Søk om ekstrahenting"]');
        expect(newEvent.length).toBe(1);
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

    it('Should show Notifications if role is Partner or Ambassador', async () => {
        // Set our role to Partner and Ambassador
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Partner || role === Roles.Ambassador;
        });
        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <CalendarPage />
                </Router>
            </KeycloakProvider>,
        );

        const title = await findByText('Varslinger');
        expect(title).toBeInTheDocument();
    });

    it('Should show ChangeLog if role is Oslo', async () => {
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

        const title = await findByText('Endringslogg');
        expect(title).toBeInTheDocument();
    });
});
