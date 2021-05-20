import React from 'react';
import { cleanup, fireEvent, setupUseAuthMock, render, screen } from '../../../test-utils';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Event } from '../../../src/components/events/Event';
import { mockEvents } from '../../../__mocks__/mockEvents';
import resetAllMocks = jest.resetAllMocks;

describe('Provides an interface to view and edit an Event', () => {
    afterEach(() => {
        resetAllMocks();
        cleanup();
    });

    it('Should show edit symbol on Event if user is logged in as REG', async () => {
        setupUseAuthMock({ isAdmin: true });

        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        render(
            <MemoryRouter>
                <Event
                    event={mockEvents[0]}
                    afterDeleteSingleEvent={afterDeleteSingleEvent}
                    afterDeleteRangeEvent={afterDeleteRangeEvent}
                />
            </MemoryRouter>,
        );

        // Find the title of the event
        expect(screen.getByLabelText('Rediger avtale')).toBeInTheDocument();
    });

    it('Should show edit symbol on Event if user is logged in as a station that has the event', async () => {
        const mockEvent = mockEvents[0];
        setupUseAuthMock({
            isStasjon: true,
            ownsResource: (eventOwnerId: number) => eventOwnerId === mockEvent.resource.station.id,
        });

        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        render(
            <MemoryRouter>
                <Event
                    event={mockEvent}
                    afterDeleteSingleEvent={afterDeleteSingleEvent}
                    afterDeleteRangeEvent={afterDeleteRangeEvent}
                />
            </MemoryRouter>,
        );

        expect(screen.getByLabelText('Rediger avtale')).toBeInTheDocument();
    });

    it('Should not show edit symbol on Event if user is logged in as Partner', async () => {
        const mockEvent = mockEvents[0];
        setupUseAuthMock({
            isPartner: true,
            ownsResource: (eventOwnerId: number) => eventOwnerId === mockEvent.resource.partner.id,
        });

        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        render(
            <MemoryRouter>
                <Event
                    event={mockEvent}
                    afterDeleteSingleEvent={afterDeleteSingleEvent}
                    afterDeleteRangeEvent={afterDeleteRangeEvent}
                />
            </MemoryRouter>,
        );

        expect(screen.queryByLabelText('Rediger avtale')).not.toBeInTheDocument();
    });

    it('Should not show edit symbol on Event if user is not logged in', async () => {
        setupUseAuthMock();

        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        render(
            <MemoryRouter>
                <Event
                    event={mockEvents[0]}
                    afterDeleteSingleEvent={afterDeleteSingleEvent}
                    afterDeleteRangeEvent={afterDeleteRangeEvent}
                />
            </MemoryRouter>,
        );

        expect(screen.queryByLabelText('Rediger avtale')).not.toBeInTheDocument();
    });

    it('Should NOT allow range deletion of event if logged in as Partner', async () => {
        const mockEvent = mockEvents[1];
        setupUseAuthMock({
            isPartner: true,
            ownsResource: (eventOwnerId: number) => eventOwnerId === mockEvent.resource.partner.id,
        });

        render(
            <MemoryRouter>
                <Event event={mockEvent} />
            </MemoryRouter>,
        );

        // Find the delete button
        const deleteButton = await screen.findByText('Avlys uttak');

        // Click the delete button
        fireEvent(
            deleteButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Make sure the options buttons for single or period deletion is hidden
        const optionButton1 = screen.queryByText('Engangstilfelle');
        const optionButton2 = screen.queryByText('Over en periode');

        expect(optionButton1).not.toBeInTheDocument();
        expect(optionButton2).not.toBeInTheDocument();
    });
});
