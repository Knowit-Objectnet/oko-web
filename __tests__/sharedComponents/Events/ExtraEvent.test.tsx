import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../../src/keycloak';
import fetch from 'jest-fetch-mock';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { apiUrl } from '../../../src/types';
import theme from '../../../src/theme';
import { ThemeProvider } from 'styled-components';
import add from 'date-fns/add';
import { mockLocations } from '../../../__mocks__/mockLocations';
import { ExtraEvent } from '../../../src/sharedComponents/Events/ExtraEvent';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides an interface to create a pickup/Extra event', () => {
    // Alert options
    const options = {
        position: positions.TOP_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
    };

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async (req) => {
            if (req.url.startsWith(`${apiUrl}/pickups`)) {
                const data = await req.json();
                return JSON.stringify({
                    id: -1,
                    startDateTime: data.startDateTime,
                    endDateTime: data.endDateTime,
                    station: mockLocations[0],
                    chosenPartner: null,
                });
            }
            return '';
        });

        // Set needed keycloak data
        keycloak.token = 'FakeToken';
        keycloak.tokenParsed.GroupID = mockLocations[0].id;
        keycloak.tokenParsed.groups = [mockLocations[0].name];
    });

    afterEach(() => {
        cleanup();
    });

    it('should be possible to add pickup/extra event', async () => {
        // Get a start end end date that isnt a saturday or sunday
        let date = new Date();
        if (date.getDay() === 0 || date.getDay() === 6) {
            date = add(date, { days: 2 });
        }
        const start = new Date(date.setHours(16, 0, 0, 0));
        const end = new Date(date.setHours(16, 30, 0, 0));

        const mockAfterSubmit = jest.fn();

        // Render
        const { findByText, findByPlaceholderText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <ExtraEvent start={start} end={end} afterSubmit={mockAfterSubmit} />
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        const messageText = await findByPlaceholderText('Meldingstekst (maks 200 tegn)');

        // Set the message text
        fireEvent.change(messageText, {
            target: { value: 'Ting må hentes' },
        });

        // Get the submit button
        const submitButton = await findByText('Send');

        // Click the submission button
        fireEvent(
            submitButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Expect the afterSubmit function to be called with the data
        await waitFor(() => {
            expect(mockAfterSubmit).toHaveBeenCalledTimes(1);
        });
        expect(mockAfterSubmit.mock.calls[0]).toEqual([true]);
    });
});
