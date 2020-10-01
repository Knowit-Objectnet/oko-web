import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { mockApiEvents } from '../../__mocks__/mockEvents';
import { ApiEvent, EventInfo, Roles } from '../../src/types';
import theme from '../../src/theme';
import { ThemeProvider } from 'styled-components';

// Component to test
import { AmbassadorCalendar } from '../../src/pages/calendar/AmbassadorCalendar/AmbassadorCalendar';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides a page for ambassadors to view the calendar', () => {
    const events: EventInfo[] = mockApiEvents
        .map((event: ApiEvent) => {
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
        })
        .filter((event) => event.resource.location.id === 0);

    beforeEach(() => {
        // Set the role to ambassador
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Ambassador;
        });

        // Set the groupID to 0 (Haraldrud)
        keycloak.tokenParsed.GroupID = 0;
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render without errors', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onWeekChangeMock = jest.fn();
        const isToggled = false;
        const date = new Date();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AmbassadorCalendar
                        date={date}
                        isToggled={isToggled}
                        onSelectEvent={onSelectEventMock}
                        onWeekChange={onWeekChangeMock}
                        events={events}
                    />
                </ThemeProvider>
            </KeycloakProvider>,
        );
    });

    /* Broken test
    it('Should render all the events for 7.13.2020-7.17.2020 at Haraldrud', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onWeekChangeMock = jest.fn();
        const isToggled = false;
        const date = new Date();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        const { findAllByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AmbassadorCalendar
                        date={date}
                        isToggled={isToggled}
                        onSelectEvent={onSelectEventMock}
                        onWeekChange={onWeekChangeMock}
                        events={events}
                    />
                </ThemeProvider>
            </KeycloakProvider>,
        );

        const fretexGroups = await findAllByText('Fretex');
        expect(fretexGroups.length).toBe(5);

        // Find all the agenda groups with fretex which should be 5 as there's 5 days and
        // events by fretex on all days
    }); */
});
