import React from 'react';
import { cleanup, setupUseAuthMock, render, screen } from '../../../test-utils';
import '@testing-library/jest-dom';
import { mockApiEvents } from '../../../__mocks__/mockEvents';
import { EventInfo } from '../../../src/types';
import { PartnerCalendar } from '../../../src/pages/kalender/deprecated/PartnerCalendar/PartnerCalendar';
import { ApiEvent } from '../../../src/services/deprecated/EventService';
import resetAllMocks = jest.resetAllMocks;

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
                    station: event.station,
                    recurrenceRule: event.recurrenceRule,
                },
            };
            return newEvent;
        })
        .filter((event) => event.resource.partner.id === 1);

    beforeEach(() => {
        setupUseAuthMock({ isPartner: true, ownsResource: (ownerId: number) => ownerId === 1 });
    });

    afterEach(() => {
        resetAllMocks();
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
            <PartnerCalendar
                date={date}
                showCalendar={isToggled}
                onSelectEvent={onSelectEventMock}
                onWeekChange={onWeekChangeMock}
                events={events}
            />,
        );
    });

    it('Should render all the station/locatiion groups for 7.13.2020-7.18.2020 for Fretex', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onWeekChangeMock = jest.fn();
        const isToggled = false;
        const date = new Date();
        date.setFullYear(2020, 6, 13);
        date.setHours(7, 0, 0, 0);

        render(
            <PartnerCalendar
                date={date}
                showCalendar={isToggled}
                onSelectEvent={onSelectEventMock}
                onWeekChange={onWeekChangeMock}
                events={events}
            />,
        );

        const haraldrudGroups = await screen.findAllByText('Haraldrud');
        expect(haraldrudGroups.length).toBe(5);
        const smestadGroups = await screen.findAllByText('Smestad');
        expect(smestadGroups.length).toBe(1);
    });

    it('Should change which station groups are rendered when the date changes', async () => {
        // set up props for the calendar
        const onSelectEventMock = jest.fn();
        const onWeekChangeMock = jest.fn();
        const isToggled = false;
        const date = new Date();
        date.setFullYear(2020, 6, 15);
        date.setHours(7, 0, 0, 0);

        render(
            <PartnerCalendar
                date={date}
                showCalendar={isToggled}
                onSelectEvent={onSelectEventMock}
                onWeekChange={onWeekChangeMock}
                events={events}
            />,
        );

        const haraldrudGroups = await screen.findAllByText('Haraldrud');
        expect(haraldrudGroups.length).toBe(3);
        const smestadGroups = await screen.findAllByText('Smestad');
        expect(smestadGroups.length).toBe(1);
    });
});
