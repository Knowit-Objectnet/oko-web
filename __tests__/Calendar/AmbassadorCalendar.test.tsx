import React from 'react';
import { cleanup, render, screen } from '../../test-utils';
import '@testing-library/jest-dom';
import keycloak from '../../src/keycloak';
import { mockApiEvents } from '../../__mocks__/mockEvents';
import { EventInfo, Roles } from '../../src/types';

// Component to test
import { AmbassadorCalendar } from '../../src/pages/calendar/AmbassadorCalendar/AmbassadorCalendar';
import { ApiEvent } from '../../src/api/EventService';

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
                    station: event.station,
                    recurrenceRule: event.recurrenceRule,
                },
            };
            return newEvent;
        })
        .filter((event) => event.resource.station.id === 0);

    // Save the original clientHeight of the element rendered in the virtualDom by Jest
    const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight');

    beforeAll(() => {
        /* Redefine the clientHeight property to give it a value higher than 0.
         *
         * This is needed because EventsColumn inside the calendar needs a clientHeight value to know how it
         * should render the events inside of it (it has a check of clientHeight > 0)
         */
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 1066 });
    });

    afterAll(() => {
        // Set the clientHeight property back to it's original value before exiting the test set to not
        // interfere with other tests
        if (originalClientHeight) {
            Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight);
        } else {
            Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 0 });
        }
    });

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
            <AmbassadorCalendar
                date={date}
                isToggled={isToggled}
                onSelectEvent={onSelectEventMock}
                onWeekChange={onWeekChangeMock}
                events={events}
            />,
        );
    });

    it('Should render all the events for 7.13.2020-7.17.2020 at Haraldrud', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onWeekChangeMock = jest.fn();
        const isToggled = false;
        const date = new Date();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        render(
            <AmbassadorCalendar
                date={date}
                isToggled={isToggled}
                onSelectEvent={onSelectEventMock}
                onWeekChange={onWeekChangeMock}
                events={events}
            />,
        );

        const fretexGroups = await screen.findAllByText('Fretex');
        expect(fretexGroups.length).toBe(5);

        // Find all the agenda groups with fretex which should be 5 as there's 5 days and
        // events by fretex on all days
    });
});
