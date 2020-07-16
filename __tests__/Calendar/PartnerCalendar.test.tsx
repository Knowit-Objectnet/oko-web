import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { mockApiEvents } from '../../__mocks__/mockEvents';
import { Roles } from '../../src/types';

// Component to test
import { PartnerCalendar } from '../../src/pages/calendar/PartnerCalendar/PartnerCalendar';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides a page for partners to view the calendar', () => {
    beforeEach(() => {
        // Reset the mocks
        fetch.resetMocks();
        // Set the mock responses to mock the API
        fetch.mockResponse(async (req) => {
            const url = new URL(req.url);
            const pathname = url.pathname;
            const fromDate = url.searchParams.get('from-date');
            const toDate = url.searchParams.get('to-date');
            const partner = url.searchParams.get('partner-id');
            let events = mockApiEvents;
            if (fromDate) {
                const from = new Date(fromDate);
                events = events.filter((event) => new Date(event.startDateTime) > from);
            }
            if (toDate) {
                const to = new Date(toDate);
                events = events.filter((event) => new Date(event.startDateTime) < to);
            }
            if (partner) {
                events = events.filter((event) => event.partner.id === parseInt(partner));
            }
            if (pathname.endsWith('/calendar/events/')) {
                return JSON.stringify(events);
            }
            return '';
        });

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
                />
            </KeycloakProvider>,
        );
    });

    it('Should render all the station/locatiion groups for 7.13.2020-7.18.2020 for Fretex', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onWeekCahngeMock = jest.fn();
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
                />
            </KeycloakProvider>,
        );


        const haraldrudGroups = await findAllByText('Haraldrud');
        expect(haraldrudGroups.length).toBe(3);
        const smestadGroups = await findAllByText('Smestad');
        expect(smestadGroups.length).toBe(1);
    });
});
