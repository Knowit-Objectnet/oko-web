import React from 'react';
import { cleanup, fireEvent, render, screen } from '../../../test-utils';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import keycloak from '../../../src/auth/keycloak';
import { Event } from '../../../src/components/events/Event';
import { mockEvents } from '../../../__mocks__/mockEvents';
import { Roles } from '../../../src/types';

describe('Provides an interface to view and edit an Event', () => {
    afterEach(() => {
        cleanup();
    });

    it('Should show edit symbol on Event if user is logged in as REG', async () => {
        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        // Change the keycloak instance to be logged in as REG
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });

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
        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        // Change the keycloak instance to be logged in as REG
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Ambassador;
        });

        // Set the stations groupID
        keycloak.tokenParsed.GroupID = mockEvents[0].resource.station.id;

        render(
            <MemoryRouter>
                <Event
                    event={mockEvents[0]}
                    afterDeleteSingleEvent={afterDeleteSingleEvent}
                    afterDeleteRangeEvent={afterDeleteRangeEvent}
                />
            </MemoryRouter>,
        );

        expect(screen.getByLabelText('Rediger avtale')).toBeInTheDocument();
    });

    it('Should not show edit symbol on Event if user is logged in as Partner', async () => {
        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        // Change the keycloak instance to be logged in as Partner
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Partner;
        });

        // Set the partners groupID
        keycloak.tokenParsed.GroupID = mockEvents[0].resource.partner.id;

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

    it('Should not show edit symbol on Event if user is not logged in', async () => {
        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        // Change the keycloak instance to be nothing
        keycloak.hasRealmRole = jest.fn(() => {
            return false;
        });

        // Set the groupID to nothing
        keycloak.tokenParsed.GroupID = undefined;

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
        // Change the keycloak instance to be logged in as Partner
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Partner;
        });

        // Set the partners groupID
        keycloak.tokenParsed.GroupID = mockEvents[0].resource.partner.id;

        render(
            <MemoryRouter>
                <Event event={mockEvents[1]} />
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
