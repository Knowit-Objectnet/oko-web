import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { mockApiEvents } from '../../__mocks__/mockEvents';
import { ApiEvent, EventInfo, Roles } from '../../src/types';

// Component to test
import { PartnerCalendar } from '../../src/pages/calendar/PartnerCalendar/PartnerCalendar';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides a page for partners to view the calendar', () => {
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
        .filter((event) => event.resource.partner.id === 1);

    beforeEach(() => {
        // Set the role to ambassador
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Partner;
        });

        // Set the groupID to 1 (Fretex)
        keycloak.tokenParsed.GroupID = 1;
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render without errors', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onWeekCahngeMock = jest.fn();
        const deleteEventMock = jest.fn();
        const isToggled = false;
        const date = new Date();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        render(
            <KeycloakProvider keycloak={keycloak}>
                <PartnerCalendar
                    date={date}
                    isToggled={isToggled}
                    onSelectEvent={onSelectEventMock}
                    onWeekChange={onWeekCahngeMock}
                    events={events}
                    deleteEvent={deleteEventMock}
                />
            </KeycloakProvider>,
        );
    });

    it('Should render all the station/locatiion groups for 7.13.2020-7.18.2020 for Fretex', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onWeekCahngeMock = jest.fn();
        const deleteEventMock = jest.fn();
        const isToggled = false;
        const date = new Date();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        const { findAllByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <PartnerCalendar
                    date={date}
                    isToggled={isToggled}
                    onSelectEvent={onSelectEventMock}
                    onWeekChange={onWeekCahngeMock}
                    events={events}
                    deleteEvent={deleteEventMock}
                />
            </KeycloakProvider>,
        );

        const haraldrudGroups = await findAllByText('Haraldrud');
        expect(haraldrudGroups.length).toBe(5);
        const smestadGroups = await findAllByText('Smestad');
        expect(smestadGroups.length).toBe(1);
    });

    it('Should change which station/location groups are rendered when the date changes', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onWeekCahngeMock = jest.fn();
        const deleteEventMock = jest.fn();
        const isToggled = false;
        const date = new Date();
        date.setFullYear(2020, 6, 15);
        date.setHours(7, 0, 0, 0);

        const { findAllByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <PartnerCalendar
                    date={date}
                    isToggled={isToggled}
                    onSelectEvent={onSelectEventMock}
                    onWeekChange={onWeekCahngeMock}
                    events={events}
                    deleteEvent={deleteEventMock}
                />
            </KeycloakProvider>,
        );

        const haraldrudGroups = await findAllByText('Haraldrud');
        expect(haraldrudGroups.length).toBe(3);
        const smestadGroups = await findAllByText('Smestad');
        expect(smestadGroups.length).toBe(1);
    });
});
