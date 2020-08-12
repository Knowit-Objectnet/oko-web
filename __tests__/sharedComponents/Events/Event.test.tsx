import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { Event } from '../../../src/sharedComponents/Events/Event';
import { mockApiEvents, mockEvents } from '../../../__mocks__/mockEvents';
import fetch from 'jest-fetch-mock';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { apiUrl, Roles } from '../../../src/types';
import theme from '../../../src/theme';
import { ThemeProvider } from 'styled-components';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides an interface to view and edit an Event', () => {
    // router history
    let history: MemoryHistory;

    // Alert options
    const options = {
        position: positions.TOP_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
    };

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async ({ url }) => {
            if (url.startsWith(`${apiUrl}/events`)) {
                return JSON.stringify(mockApiEvents);
            } else {
                return JSON.stringify([]);
            }
        });
        history = createMemoryHistory();
    });

    afterEach(() => {
        cleanup();
    });

    it('Should show edit symbol on Event if user is logged in as REG', async () => {
        const beforeDeleteSingleEvent = jest.fn();
        const afterDeleteSingleEvent = jest.fn();
        const beforeDeleteRangeEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();
        const beforeUpdateEvent = jest.fn();
        const afterUpdateEvent = jest.fn();

        // Change the keycloak instance to be logged in as REG
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });

        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <Router history={history}>
                            <Event
                                {...mockEvents[0]}
                                beforeDeleteSingleEvent={beforeDeleteSingleEvent}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                beforeDeleteRangeEvent={beforeDeleteRangeEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                                beforeUpdateEvent={beforeUpdateEvent}
                                afterUpdateEvent={afterUpdateEvent}
                            />
                        </Router>
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        expect(title.parentElement?.children.length).toBe(2);
    });

    it('Should show edit symbol on Event if user is logged in as Partner and its the partners event', async () => {
        const beforeDeleteSingleEvent = jest.fn();
        const afterDeleteSingleEvent = jest.fn();
        const beforeDeleteRangeEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();
        const beforeUpdateEvent = jest.fn();
        const afterUpdateEvent = jest.fn();

        // Change the keycloak instance to be logged in as Partner
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Partner;
        });

        // Set the partners groupID
        keycloak.tokenParsed.GroupID = mockEvents[0].resource.partner.id;

        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <Router history={history}>
                            <Event
                                {...mockEvents[0]}
                                beforeDeleteSingleEvent={beforeDeleteSingleEvent}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                beforeDeleteRangeEvent={beforeDeleteRangeEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                                beforeUpdateEvent={beforeUpdateEvent}
                                afterUpdateEvent={afterUpdateEvent}
                            />
                        </Router>
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        expect(title.parentElement?.children.length).toBe(2);
    });

    it('Should not show edit symbol on Event if user is not logged in as REG or partner who own eveent', async () => {
        const beforeDeleteSingleEvent = jest.fn();
        const afterDeleteSingleEvent = jest.fn();
        const beforeDeleteRangeEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();
        const beforeUpdateEvent = jest.fn();
        const afterUpdateEvent = jest.fn();

        // Change the keycloak instance to be nothing
        keycloak.hasRealmRole = jest.fn(() => {
            return false;
        });

        // Set the groupID to nothing
        keycloak.tokenParsed.GroupID = undefined;

        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <Router history={history}>
                            <Event
                                {...mockEvents[0]}
                                beforeDeleteSingleEvent={beforeDeleteSingleEvent}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                beforeDeleteRangeEvent={beforeDeleteRangeEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                                beforeUpdateEvent={beforeUpdateEvent}
                                afterUpdateEvent={afterUpdateEvent}
                            />
                        </Router>
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        expect(title.parentElement?.children.length).toBe(1);
    });

    it('Should show edit interface on edit button click and should submit new data to update function', async () => {
        const beforeDeleteSingleEvent = jest.fn();
        const afterDeleteSingleEvent = jest.fn();
        const beforeDeleteRangeEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();
        const beforeUpdateEvent = jest.fn();
        const afterUpdateEvent = jest.fn();

        // Change the keycloak instance to be logged in as REG
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });

        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <Router history={history}>
                            <Event
                                {...mockEvents[0]}
                                beforeDeleteSingleEvent={beforeDeleteSingleEvent}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                beforeDeleteRangeEvent={beforeDeleteRangeEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                                beforeUpdateEvent={beforeUpdateEvent}
                                afterUpdateEvent={afterUpdateEvent}
                            />
                        </Router>
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        // Find the title of the event
        const title = await findByText(mockEvents[0].title);
        const editButton = title.parentElement?.children[1].firstChild;

        // Fail test if we cant find edit button
        if (!editButton) fail('failed to find edit button');

        // Click the edit button
        await waitFor(() => {
            fireEvent(
                editButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Find the submit button
        const submitButton = await findByText('Godkjenn');

        // Click the submit button
        await waitFor(() => {
            fireEvent(
                submitButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Expect the submission button to be called once and be supplied with the updated data
        expect(beforeUpdateEvent.mock.calls.length).toBe(1);
        expect(beforeUpdateEvent.mock.calls[0]).toEqual([
            `${apiUrl}/events`,
            mockEvents[0].resource.eventId,
            mockEvents[0].start.toISOString(),
            mockEvents[0].end.toISOString(),
        ]);
        expect(afterUpdateEvent.mock.calls.length).toBe(1);
        expect(afterUpdateEvent.mock.calls[0]).toEqual([true, `${apiUrl}/events`]);
    });

    it('Should allow single deletion of event if logged in as REG', async () => {
        const beforeDeleteSingleEvent = jest.fn();
        const afterDeleteSingleEvent = jest.fn();
        const beforeDeleteRangeEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();
        const beforeUpdateEvent = jest.fn();
        const afterUpdateEvent = jest.fn();

        // Change the keycloak instance to be logged in as REG
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });

        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <Router history={history}>
                            <Event
                                {...mockEvents[0]}
                                beforeDeleteSingleEvent={beforeDeleteSingleEvent}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                beforeDeleteRangeEvent={beforeDeleteRangeEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                                beforeUpdateEvent={beforeUpdateEvent}
                                afterUpdateEvent={afterUpdateEvent}
                            />
                        </Router>
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
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
        await waitFor(() => {
            fireEvent(
                deleteSubmissionButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Expect the submission button to be called once and be supplied with the updated data
        expect(beforeDeleteSingleEvent.mock.calls.length).toBe(1);
        expect(beforeDeleteSingleEvent.mock.calls[0]).toEqual([
            `${apiUrl}/events?eventId=${mockEvents[0].resource.eventId}`,
            mockEvents[0],
        ]);
        expect(afterDeleteSingleEvent.mock.calls.length).toBe(1);
        expect(afterDeleteSingleEvent.mock.calls[0]).toEqual([
            true,
            `${apiUrl}/events?eventId=${mockEvents[0].resource.eventId}`,
        ]);
    });

    it('Should allow single deletion of event if logged in as Partner who own event', async () => {
        const beforeDeleteSingleEvent = jest.fn();
        const afterDeleteSingleEvent = jest.fn();
        const beforeDeleteRangeEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();
        const beforeUpdateEvent = jest.fn();
        const afterUpdateEvent = jest.fn();

        // Change the keycloak instance to be logged in as Partner
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Partner;
        });

        // Set the partners groupID
        keycloak.tokenParsed.GroupID = mockEvents[0].resource.partner.id;

        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <Router history={history}>
                            <Event
                                {...mockEvents[0]}
                                beforeDeleteSingleEvent={beforeDeleteSingleEvent}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                beforeDeleteRangeEvent={beforeDeleteRangeEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                                beforeUpdateEvent={beforeUpdateEvent}
                                afterUpdateEvent={afterUpdateEvent}
                            />
                        </Router>
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
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
        await waitFor(() => {
            fireEvent(
                deleteSubmissionButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Expect the submission button to be called once and be supplied with the updated data
        expect(beforeDeleteSingleEvent.mock.calls.length).toBe(1);
        expect(beforeDeleteSingleEvent.mock.calls[0]).toEqual([
            `${apiUrl}/events?eventId=${mockEvents[0].resource.eventId}`,
            mockEvents[0],
        ]);
        expect(afterDeleteSingleEvent.mock.calls.length).toBe(1);
        expect(afterDeleteSingleEvent.mock.calls[0]).toEqual([
            true,
            `${apiUrl}/events?eventId=${mockEvents[0].resource.eventId}`,
        ]);
    });

    it('Should allow range deletion of event if logged in as REG', async () => {
        const beforeDeleteSingleEvent = jest.fn();
        const afterDeleteSingleEvent = jest.fn();
        const beforeDeleteRangeEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();
        const beforeUpdateEvent = jest.fn();
        const afterUpdateEvent = jest.fn();

        // Change the keycloak instance to be logged in as REG
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Oslo;
        });

        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <Router history={history}>
                            <Event
                                {...mockEvents[1]}
                                beforeDeleteSingleEvent={beforeDeleteSingleEvent}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                beforeDeleteRangeEvent={beforeDeleteRangeEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                                beforeUpdateEvent={beforeUpdateEvent}
                                afterUpdateEvent={afterUpdateEvent}
                            />
                        </Router>
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
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
        await waitFor(() => {
            fireEvent(
                optionButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Find delete submission button
        const deleteSubmissionButton = await findByText('Bekreft');

        // Click the delete submission button
        await waitFor(() => {
            fireEvent(
                deleteSubmissionButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Expect the submission button to be called once and be supplied with the updated data
        const date = new Date();
        date.setHours(2, 0, 0, 0);

        expect(beforeDeleteRangeEvent.mock.calls.length).toBe(1);
        expect(beforeDeleteRangeEvent.mock.calls[0]).toEqual([`${apiUrl}/events`, mockEvents[1], [date, date]]);

        expect(afterDeleteRangeEvent.mock.calls.length).toBe(1);
        expect(afterDeleteRangeEvent.mock.calls[0]).toEqual([true, `${apiUrl}/events`]);
    });

    it('Should allow range deletion of event if logged in as Partner who own event', async () => {
        const beforeDeleteSingleEvent = jest.fn();
        const afterDeleteSingleEvent = jest.fn();
        const beforeDeleteRangeEvent = jest.fn();
        const afterDeleteRangeEvent = jest.fn();
        const beforeUpdateEvent = jest.fn();
        const afterUpdateEvent = jest.fn();

        // Change the keycloak instance to be logged in as Partner
        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Partner;
        });

        // Set the partners groupID
        keycloak.tokenParsed.GroupID = mockEvents[0].resource.partner.id;

        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <Router history={history}>
                            <Event
                                {...mockEvents[1]}
                                beforeDeleteSingleEvent={beforeDeleteSingleEvent}
                                afterDeleteSingleEvent={afterDeleteSingleEvent}
                                beforeDeleteRangeEvent={beforeDeleteRangeEvent}
                                afterDeleteRangeEvent={afterDeleteRangeEvent}
                                beforeUpdateEvent={beforeUpdateEvent}
                                afterUpdateEvent={afterUpdateEvent}
                            />
                        </Router>
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
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
        await waitFor(() => {
            fireEvent(
                optionButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Find delete submission button
        const deleteSubmissionButton = await findByText('Bekreft');

        // Click the delete submission button
        await waitFor(() => {
            fireEvent(
                deleteSubmissionButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Expect the submission button to be called once and be supplied with the updated data
        const date = new Date();
        date.setHours(2, 0, 0, 0);
        expect(beforeDeleteRangeEvent.mock.calls.length).toBe(1);
        expect(beforeDeleteRangeEvent.mock.calls[0]).toEqual([`${apiUrl}/events`, mockEvents[1], [date, date]]);
        expect(afterDeleteRangeEvent.mock.calls.length).toBe(1);
        expect(afterDeleteRangeEvent.mock.calls[0]).toEqual([true, `${apiUrl}/events`]);
    });
});
