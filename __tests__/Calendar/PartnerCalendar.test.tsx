import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
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
            if (pathname.startsWith('/calendar/events/')) {
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
        date.setFullYear(2020, 7, 13);
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

    it('Should render all the station location groups for 7.13.2020-7.18.2020', async () => {});

    it('Should change which station location groups are rendered when the date changes', async () => {});

    it('Should render the dropdown on a station location groups list item when toggled', async () => {});

    it('Should render the event info when event is clicked', async () => {});

    it('Should delete event when delete button is pressed', async () => {});

    it('Should render all the events in the weekcalendar for 7.13.2020-7.18.2020 when toggled', async () => {});
});
