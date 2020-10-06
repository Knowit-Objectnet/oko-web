import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { mockApiEvents } from '../../__mocks__/mockEvents';
import { ApiEvent, apiUrl, EventInfo, Roles } from '../../src/types';

// Component to test
import { RegCalendar } from '../../src/pages/calendar/RegCalendar/RegCalendar';
import { mockLocations } from '../../__mocks__/mockLocations';
import theme from '../../src/theme';
import { ThemeProvider } from 'styled-components';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides a page for REG to view the calendar', () => {
    const events: EventInfo[] = mockApiEvents.map((event: ApiEvent) => {
        const newEvent: EventInfo = {
            start: new Date(event.startDateTime),
            end: new Date(event.endDateTime),
            title: event.partner.name,
            resource: {
                eventId: event.id,
                partner: event.partner,
                station: event.station,
                recurrenceRule: event.recurrenceRule,
            },
        };
        return newEvent;
    });

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async ({ url }) => {
            if (url.startsWith(`${apiUrl}/events`)) {
                return JSON.stringify(mockApiEvents);
            } else if (url.startsWith(`${apiUrl}/stations`)) {
                return JSON.stringify(mockLocations);
            }
            return '';
        });
        // Set the role to ambassador
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render without errors', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const newEvent = jest.fn();
        const onSelectSlot = jest.fn();
        const onWeekChange = jest.fn();
        const date = new Date();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <RegCalendar
                        date={date}
                        onSelectEvent={onSelectEventMock}
                        newEvent={newEvent}
                        onSelectSlot={onSelectSlot}
                        events={events}
                        isToggled={false}
                        onWeekChange={onWeekChange}
                    />
                </ThemeProvider>
            </KeycloakProvider>,
        );
    });

    it('Should render the events in an agenda table form for 7.13.2020-7.18.2020', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const newEvent = jest.fn();
        const onSelectSlot = jest.fn();
        const date = new Date();
        const onWeekChange = jest.fn();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        const { findAllByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <RegCalendar
                        date={date}
                        onSelectEvent={onSelectEventMock}
                        newEvent={newEvent}
                        onSelectSlot={onSelectSlot}
                        events={events}
                        isToggled={false}
                        onWeekChange={onWeekChange}
                    />
                </ThemeProvider>
            </KeycloakProvider>,
        );

        const fretexGroups = await findAllByText('Fretex');
        expect(fretexGroups.length).toBe(6);
        const maritastiftelsenGroups = await findAllByText('Maritastiftelsen');
        expect(maritastiftelsenGroups.length).toBe(5);
    });

    it('Should render the events in an agenda table form for 7.15.2020-7.18.2020', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const newEvent = jest.fn();
        const onSelectSlot = jest.fn();
        const date = new Date();
        const onWeekChange = jest.fn();
        date.setFullYear(2020, 6, 15);
        date.setHours(7, 0, 0, 0);

        const { findAllByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <RegCalendar
                        date={date}
                        onSelectEvent={onSelectEventMock}
                        newEvent={newEvent}
                        onSelectSlot={onSelectSlot}
                        events={events}
                        isToggled={false}
                        onWeekChange={onWeekChange}
                    />
                </ThemeProvider>
            </KeycloakProvider>,
        );

        const fretexGroups = await findAllByText('Fretex');
        expect(fretexGroups.length).toBe(4);
        const maritastiftelsenGroups = await findAllByText('Maritastiftelsen');
        expect(maritastiftelsenGroups.length).toBe(3);
    });
});
