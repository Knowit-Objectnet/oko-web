import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../../src/keycloak';
import { mockApiEvents } from '../../../__mocks__/mockEvents';
import fetch from 'jest-fetch-mock';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { apiUrl } from '../../../src/types';
import theme from '../../../src/theme';
import { ThemeProvider } from 'styled-components';
import { NewEvent } from '../../../src/sharedComponents/Events/NewEvent';
import add from 'date-fns/add';
import { mockLocations } from '../../../__mocks__/mockLocations';
import { mockPartners } from '../../../__mocks__/mockPartners';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides an interface to create a new Event', () => {
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
            if (url.startsWith(`${apiUrl}/stations`)) {
                return JSON.stringify(mockLocations);
            } else if (url.startsWith(`${apiUrl}/partners`)) {
                return JSON.stringify(mockPartners);
            } else {
                return JSON.stringify([]);
            }
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('should be possible to add a non-reccuring event', async () => {
        // Get a start end end date that isnt a saturday or sunday
        let date = new Date();
        if (date.getDay() === 0 || date.getDay() === 6) {
            date = add(date, { days: 2 });
        }
        const start = new Date(date.setHours(16, 0, 0, 0));
        const end = new Date(date.setHours(16, 30, 0, 0));

        const mockBeforeSubmit = jest.fn();
        const mockAfterSubmit = jest.fn();

        // This has to be set as NewEvent checks if keycloak?.token exists and exists the submit function
        // if it isnt, making the test stall into infinity
        keycloak.token = 'FakeToken';
        // Render
        const { findByText, getByDisplayValue } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <NewEvent
                            start={start}
                            end={end}
                            beforeSubmit={mockBeforeSubmit}
                            afterSubmit={mockAfterSubmit}
                        />
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        // Get the selector for selecting parter
        const selectPartner = await getByDisplayValue('Velg samarbeidspartner');

        // Select partner 0 from mocks
        await waitFor(() => {
            fireEvent.change(selectPartner, {
                target: { value: mockPartners[0].id.toString() },
            });
        });

        // Get the selector for selecting station
        const selectLocation = await getByDisplayValue('Velg stasjon');

        // Select location 0 from mocks
        await waitFor(() => {
            fireEvent.change(selectLocation, {
                target: { value: mockLocations[0].id.toString() },
            });
        });

        const submitButton = await findByText('Fullfør');

        // Click the submission button
        await waitFor(() =>
            fireEvent(
                submitButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            ),
        );

        // Expect
        expect(mockBeforeSubmit).toHaveBeenCalledTimes(1);
        expect(mockBeforeSubmit.mock.calls[0]).toEqual([
            `${apiUrl}/events`,
            {
                startDateTime: start.toISOString(),
                endDateTime: end.toISOString(),
                stationId: mockLocations[0].id,
                partnerId: mockPartners[0].id,
            },
            mockLocations[0],
            mockPartners[0],
        ]);

        // Expect
        expect(mockAfterSubmit).toHaveBeenCalledTimes(1);
        expect(mockAfterSubmit.mock.calls[0]).toEqual([true, `${apiUrl}/events`]);
    });
});
