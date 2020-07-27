import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { mockApiEvents } from '../../__mocks__/mockEvents';
import { ApiEvent, EventInfo, Roles } from '../../src/types';

// Component to test
import { RegCalendar } from '../../src/pages/calendar/RegCalendar/RegCalendar';

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
                location: event.station,
                recurrenceRule: event.recurrenceRule,
            },
        };
        return newEvent;
    });

    beforeEach(() => {
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
        const date = new Date();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        render(
            <KeycloakProvider keycloak={keycloak}>
                <RegCalendar
                    date={date}
                    onSelectEvent={onSelectEventMock}
                    newEvent={newEvent}
                    onSelectSlot={onSelectSlot}
                    events={events}
                    isToggled={false}
                />
            </KeycloakProvider>,
        );
    });

    it('Should render the events in an agenda table form for 7.13.2020-7.18.2020', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const newEvent = jest.fn();
        const onSelectSlot = jest.fn();
        const date = new Date();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        const { findAllByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <RegCalendar
                    date={date}
                    onSelectEvent={onSelectEventMock}
                    newEvent={newEvent}
                    onSelectSlot={onSelectSlot}
                    events={events}
                    isToggled={false}
                />
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
        date.setFullYear(2020, 6, 15);
        date.setHours(7, 0, 0, 0);

        const { findAllByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <RegCalendar
                    date={date}
                    onSelectEvent={onSelectEventMock}
                    newEvent={newEvent}
                    onSelectSlot={onSelectSlot}
                    events={events}
                    isToggled={false}
                />
            </KeycloakProvider>,
        );

        const fretexGroups = await findAllByText('Fretex');
        expect(fretexGroups.length).toBe(4);
        const maritastiftelsenGroups = await findAllByText('Maritastiftelsen');
        expect(maritastiftelsenGroups.length).toBe(3);
    });
});
