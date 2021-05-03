import React from 'react';
import { render, cleanup, screen, setupUseAuthMock } from '../../../test-utils';
import '@testing-library/jest-dom';
import { mockApiEvents } from '../../../__mocks__/mockEvents';
import { EventInfo } from '../../../src/types';
import { AdminCalendar } from '../../../src/pages/calendar/deprecated/AdminCalendar/AdminCalendar';
import { mockStations } from '../../../__mocks__/mockStations';
import { ApiEvent } from '../../../src/services/EventService';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import resetAllMocks = jest.resetAllMocks;

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

    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onGet('/stations').reply(200, mockStations);
        axiosMock.onGet('/events').reply(200, mockApiEvents);

        setupUseAuthMock({ isAdmin: true });
    });

    afterEach(() => {
        axiosMock.reset();
        resetAllMocks();
        cleanup();
    });

    it('Should render agenda without errors', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onSelectSlot = jest.fn();
        const onWeekChange = jest.fn();
        const date = new Date();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        render(
            <AdminCalendar
                date={date}
                onSelectEvent={onSelectEventMock}
                onSelectSlot={onSelectSlot}
                events={events}
                isToggled={false}
                onWeekChange={onWeekChange}
            />,
        );
    });

    it('Should render working week view without errors', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onSelectSlot = jest.fn();
        const onWeekChange = jest.fn();
        const date = new Date();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        render(
            <AdminCalendar
                date={date}
                onSelectEvent={onSelectEventMock}
                onSelectSlot={onSelectSlot}
                events={events}
                isToggled={true}
                onWeekChange={onWeekChange}
            />,
        );
    });

    it('Should render the events in an agenda table form for 7.13.2020-7.18.2020', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onSelectSlot = jest.fn();
        const date = new Date();
        const onWeekChange = jest.fn();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        render(
            <AdminCalendar
                date={date}
                onSelectEvent={onSelectEventMock}
                onSelectSlot={onSelectSlot}
                events={events}
                isToggled={false}
                onWeekChange={onWeekChange}
            />,
        );

        const fretexGroups = await screen.findAllByText('Fretex');
        expect(fretexGroups.length).toBe(6);
        const maritastiftelsenGroups = await screen.findAllByText('Maritastiftelsen');
        expect(maritastiftelsenGroups.length).toBe(5);
    });

    it('Should render the events in an agenda table form for 7.15.2020-7.18.2020', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onSelectSlot = jest.fn();
        const date = new Date();
        const onWeekChange = jest.fn();
        date.setFullYear(2020, 6, 15);
        date.setHours(7, 0, 0, 0);

        render(
            <AdminCalendar
                date={date}
                onSelectEvent={onSelectEventMock}
                onSelectSlot={onSelectSlot}
                events={events}
                isToggled={false}
                onWeekChange={onWeekChange}
            />,
        );

        const fretexGroups = await screen.findAllByText('Fretex');
        expect(fretexGroups.length).toBe(4);
        const maritastiftelsenGroups = await screen.findAllByText('Maritastiftelsen');
        expect(maritastiftelsenGroups.length).toBe(3);
    });
});
