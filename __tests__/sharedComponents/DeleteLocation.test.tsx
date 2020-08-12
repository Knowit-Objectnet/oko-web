import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { apiUrl } from '../../src/types';
import fetch from 'jest-fetch-mock';
import theme from '../../src/theme';
import { ThemeProvider } from 'styled-components';
import { DeleteLocation } from '../../src/sharedComponents/DeleteLocation';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides an interface to submit a new partner', () => {
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
            if (req.url.startsWith(`${apiUrl}/stations`)) {
                if (req.method === 'GET') {
                    return JSON.stringify([
                        {
                            id: 1,
                            name: 'Haraldrud',
                            hours: {
                                MONDAY: ['08:00:00Z', '20:00:00Z'],
                                TUESDAY: ['08:00:00Z', '20:00:00Z'],
                                WEDNESDAY: ['08:00:00Z', '20:00:00Z'],
                                THURSDAY: ['08:00:00Z', '20:00:00Z'],
                                FRIDAY: ['10:00:00Z', '18:00:00Z'],
                            },
                        },
                        {
                            id: 3,
                            name: 'Smestad',
                            hours: {
                                MONDAY: ['10:00:00Z', '20:00:00Z'],
                                TUESDAY: ['10:00:00Z', '20:00:00Z'],
                                WEDNESDAY: ['10:00:00Z', '20:00:00Z'],
                                THURSDAY: ['10:00:00Z', '20:00:00Z'],
                                FRIDAY: ['10:00:00Z', '20:00:00Z'],
                            },
                        },
                    ]);
                } else if (req.method === 'DELETE') {
                    return JSON.stringify({
                        id: 3,
                        name: 'Smestad',
                        hours: {
                            MONDAY: ['10:00:00Z', '20:00:00Z'],
                            TUESDAY: ['10:00:00Z', '20:00:00Z'],
                            WEDNESDAY: ['10:00:00Z', '20:00:00Z'],
                            THURSDAY: ['10:00:00Z', '20:00:00Z'],
                            FRIDAY: ['10:00:00Z', '20:00:00Z'],
                        },
                    });
                } else {
                    return '';
                }
            } else {
                return '';
            }
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('Should submit partner on input change and button click', async () => {
        // mock function for the submission
        const beforeSubmitMock = jest.fn();
        const afterSubmitMock = jest.fn();
        const { findByText, getByDisplayValue } = render(
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...options}>
                    <KeycloakProvider keycloak={keycloak}>
                        <DeleteLocation beforeSubmit={beforeSubmitMock} afterSubmit={afterSubmitMock} />
                    </KeycloakProvider>
                </AlertProvider>
            </ThemeProvider>,
        );

        // Get the selector for selecting which partner to delete
        const select = await getByDisplayValue('Velg stasjon');

        // Select Fretex
        await waitFor(() => {
            fireEvent.change(select, {
                target: { value: '3' },
            });
        });

        // Find the submission button
        const submitButton = await findByText('Slett');

        // Click the submission button
        await waitFor(() => {
            fireEvent(
                submitButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Expect the submission button to be called once and be supplied with the partner name
        expect(beforeSubmitMock.mock.calls.length).toBe(1);
        expect(beforeSubmitMock.mock.calls[0]).toEqual([`${apiUrl}/stations/3`, 3]);

        // Expect the submission button to be called once and be supplied with the partner name
        expect(afterSubmitMock.mock.calls.length).toBe(1);
        expect(afterSubmitMock.mock.calls[0]).toEqual([true, `${apiUrl}/stations/3`]);
    });
});
