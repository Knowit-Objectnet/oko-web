import React from 'react';
import { render, cleanup, fireEvent } from '../../../utils/test-setup';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import keycloak from '../../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { Event } from '../../../src/sharedComponents/Events/Event';
import { mockEvents } from '../../../__mocks__/mockEvents';
import { Roles } from '../../../src/types';

describe('Provides an interface to view and edit an Event', () => {
    // router history
    let history: MemoryHistory;

    beforeEach(() => {
        // TODO: need to mock Axios if tests requires API-requests
        history = createMemoryHistory();
    });

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

        const { findByText } = render(
            <Router history={history}>
                <Event
                    event={mockEvents[0]}
                    afterDeleteSingleEvent={afterDeleteSingleEvent}
                    afterDeleteRangeEvent={afterDeleteRangeEvent}
                />
            </Router>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        expect(title.parentElement?.children.length).toBe(2);
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

        const { findByText } = render(
            <Router history={history}>
                <Event
                    event={mockEvents[0]}
                    afterDeleteSingleEvent={afterDeleteSingleEvent}
                    afterDeleteRangeEvent={afterDeleteRangeEvent}
                />
            </Router>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        expect(title.parentElement?.children.length).toBe(2);
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

        const { findByText } = render(
            <Router history={history}>
                <Event
                    event={mockEvents[0]}
                    afterDeleteSingleEvent={afterDeleteSingleEvent}
                    afterDeleteRangeEvent={afterDeleteRangeEvent}
                />
            </Router>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        expect(title.parentElement?.children.length).toBe(1);
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

        const { findByText } = render(
            <Router history={history}>
                <Event
                    event={mockEvents[0]}
                    afterDeleteSingleEvent={afterDeleteSingleEvent}
                    afterDeleteRangeEvent={afterDeleteRangeEvent}
                />
            </Router>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        expect(title.parentElement?.children.length).toBe(1);
    });

    /* TODO: test disabled for now
    it('Should show edit interface on edit button click and should submit new data to update function', async () => {
        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        // Change the keycloak instance to be logged in as REG
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });

        const { findByText } = render(
                        <Router history={history}>
                            <Event
                                event={mockEvents[0]}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                            />
                        </Router>
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        const editButton = title.parentElement?.children[1].firstChild;

        // Fail test if we cant find edit button
        if (!editButton) fail('failed to find edit button');

        // Click the edit button
        fireEvent(
            editButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Find the submit button
        const submitButton = await findByText('Godkjenn');

        // Click the submit button
        fireEvent(
            submitButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // TODO: this test needs a new way to assert the result
    }); */

    /* TODO: test disabled for now, needs better asserting
    it('Should allow single deletion of event if logged in as REG', async () => {
        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        // Change the keycloak instance to be logged in as REG
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });

        const { findByText } = render(
                        <Router history={history}>
                            <Event
                                event={mockEvents[0]}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                            />
                        </Router>
        );

        // Find the delete button
        const deleteButton = await findByText('Avlys uttak');

        // Click the delete button
        fireEvent(
            deleteButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Find delete submission button
        const deleteSubmissionButton = await findByText('Bekreft');

        // Click the delete submission button
        fireEvent(
            deleteSubmissionButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // TODO: this assert does not really check if we're getting the wanted result
        await waitFor(() => expect(afterDeleteSingleEvent.mock.calls.length).toBe(1));
        expect(afterDeleteSingleEvent.mock.calls[0]).toEqual([true]);
    }); */

    /* TODO: test disabled for now, needs better asserting
    it('Should allow single deletion of event if logged in as the station who own the  event', async () => {
        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        // Change the keycloak instance to be logged in as REG
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Ambassador;
        });

        // Set the stations groupID
        keycloak.tokenParsed.GroupID = mockEvents[0].resource.location.id;

        const { findByText } = render(
                        <Router history={history}>
                            <Event
                                event={mockEvents[0]}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                            />
                        </Router>
        );

        // Find the delete button
        const deleteButton = await findByText('Avlys uttak');

        // Click the delete button
        fireEvent(
            deleteButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Find delete submission button
        const deleteSubmissionButton = await findByText('Bekreft');

        // Click the delete submission button
        fireEvent(
            deleteSubmissionButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // TODO: this assert does not really check if we're getting the wanted result
        await waitFor(() => expect(afterDeleteSingleEvent.mock.calls.length).toBe(1));
        expect(afterDeleteSingleEvent.mock.calls[0]).toEqual([true]);
    }); */

    /* TODO: test disabled for now, needs better asserting
    it('Should allow single deletion of event if logged in as Partner who own event', async () => {
        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        // Change the keycloak instance to be logged in as Partner
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Partner;
        });

        // Set the partners groupID
        keycloak.tokenParsed.GroupID = mockEvents[0].resource.partner.id;

        const { findByText } = render(
                        <Router history={history}>
                            <Event
                                event={mockEvents[0]}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                            />
                        </Router>
        );

        // Find the delete button
        const deleteButton = await findByText('Avlys uttak');

        // Click the delete button
        fireEvent(
            deleteButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Find delete submission button
        const deleteSubmissionButton = await findByText('Bekreft');

        // Click the delete submission button
        fireEvent(
            deleteSubmissionButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // TODO: this assert does not really check if we're getting the wanted result
        await waitFor(() => expect(afterDeleteSingleEvent.mock.calls.length).toBe(1));
        expect(afterDeleteSingleEvent.mock.calls[0]).toEqual([true]);
    }); */

    /* TODO: test disabled for now, needs better asserting
    it('Should allow range deletion of event if logged in as REG', async () => {
        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        // Change the keycloak instance to be logged in as REG
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });

        const { findByText } = render(
                        <Router history={history}>
                            <Event
                                event={mockEvents[0]}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                            />
                        </Router>
        );

        // Find the delete button
        const deleteButton = await findByText('Avlys uttak');

        // Click the delete button
        fireEvent(
            deleteButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Find the range deletion option
        const optionButton = await findByText('Over en periode');

        // Click the delete button
        fireEvent(
            optionButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Find delete submission button
        const deleteSubmissionButton = await findByText('Bekreft');

        // Click the delete submission button
        fireEvent(
            deleteSubmissionButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // TODO: this assert does not really check if we're getting the wanted result
        await waitFor(() => expect(afterDeleteRangeEvent.mock.calls.length).toBe(1));
        expect(afterDeleteRangeEvent.mock.calls[0]).toEqual([true]);
    }); */

    /* TODO: test disabled for now, needs better asserting
    it('Should allow range deletion of event if logged in as the station who own the event', async () => {
        const afterDeleteSingleEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();

        // Change the keycloak instance to be logged in as REG
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Ambassador;
        });

        // Set the stations groupID
        keycloak.tokenParsed.GroupID = mockEvents[0].resource.location.id;

        const { findByText } = render(
                        <Router history={history}>
                            <Event
                                event={mockEvents[0]}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                            />
                        </Router>
        );

        // Find the delete button
        const deleteButton = await findByText('Avlys uttak');

        // Click the delete button
        fireEvent(
            deleteButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Find the range deletion option
        const optionButton = await findByText('Over en periode');

        // Click the delete button
        fireEvent(
            optionButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Find delete submission button
        const deleteSubmissionButton = await findByText('Bekreft');

        // Click the delete submission button
        fireEvent(
            deleteSubmissionButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // TODO: this assert does not really check if we're getting the wanted result
        await waitFor(() => expect(afterDeleteRangeEvent.mock.calls.length).toBe(1));
        expect(afterDeleteRangeEvent.mock.calls[0]).toEqual([true]);
    }); */

    it('Should NOT allow range deletion of event if logged in as Partner', async () => {
        // Change the keycloak instance to be logged in as Partner
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Partner;
        });

        // Set the partners groupID
        keycloak.tokenParsed.GroupID = mockEvents[0].resource.partner.id;

        const { findByText, queryByText } = render(
            <Router history={history}>
                <Event event={mockEvents[1]} />
            </Router>,
        );

        // Find the delete button
        const deleteButton = await findByText('Avlys uttak');

        // Click the delete button
        fireEvent(
            deleteButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Make sure the options buttons for single or period deletion is hidden
        const optionButton1 = queryByText('Engangstilfelle');
        const optionButton2 = queryByText('Over en periode');

        expect(optionButton1).toBeNull();
        expect(optionButton2).toBeNull();
    });
});
