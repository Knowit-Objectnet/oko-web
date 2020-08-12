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
import { NewLocation } from '../../src/sharedComponents/NewLocation/NewLocation';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides an interface to submit a new station', () => {
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
                return JSON.stringify('');
            } else {
                return '';
            }
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('Should submit station on input changes and button click', async () => {
        // mock function for the submission
        const beforeSubmitMock = jest.fn();
        const afterSubmitMock = jest.fn();
        const { findByText, findByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...options}>
                    <KeycloakProvider keycloak={keycloak}>
                        <NewLocation beforeSubmit={beforeSubmitMock} afterSubmit={afterSubmitMock} />
                    </KeycloakProvider>
                </AlertProvider>
            </ThemeProvider>,
        );

        // Find the text input for the name
        const nameInput = await findByPlaceholderText('Navn på stasjon');
        expect(nameInput).toBeInTheDocument();

        // Write in the station name Test
        await waitFor(() => {
            fireEvent.change(nameInput, {
                target: { value: 'Test' },
            });
        });

        // Find the text input for the address
        const addressInput = await findByPlaceholderText('Adressen til stasjonen');
        expect(addressInput).toBeInTheDocument();

        // Write in the station address Test adresse
        await waitFor(() => {
            fireEvent.change(addressInput, {
                target: { value: 'Test adresse' },
            });
        });

        // Find the text input for the ambassador name
        const ambassadorNameInput = await findByPlaceholderText('Navn');
        expect(ambassadorNameInput).toBeInTheDocument();

        // Write in the ambassador name Ola
        await waitFor(() => {
            fireEvent.change(ambassadorNameInput, {
                target: { value: 'Ola' },
            });
        });

        // Find the text input for the ambassador phone
        const ambassadorPhoneInput = await findByPlaceholderText('Telefonnummer');
        expect(ambassadorPhoneInput).toBeInTheDocument();

        // Write in the ambassador phone number 40404040
        await waitFor(() => {
            fireEvent.change(ambassadorPhoneInput, {
                target: { value: '40404040' },
            });
        });

        // Find the text input for the ambassador mail
        const ambassadorMailInput = await findByPlaceholderText('Mail adresse');
        expect(ambassadorMailInput).toBeInTheDocument();

        // Write in the ambassador email olaRegTest@knowit.no
        await waitFor(() => {
            fireEvent.change(ambassadorMailInput, {
                target: { value: 'olaRegTest@knowit.no' },
            });
        });

        // Find the submit button
        const submitButton = await findByText('Legg til stasjon');
        expect(submitButton).toBeInTheDocument();

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
        expect(beforeSubmitMock.mock.calls[0]).toEqual([
            `${apiUrl}/stations`,
            'Test',
            {
                hours: {
                    FRIDAY: ['07:00:00Z', '20:00:00Z'],
                    MONDAY: ['07:00:00Z', '20:00:00Z'],
                    THURSDAY: ['07:00:00Z', '20:00:00Z'],
                    TUESDAY: ['07:00:00Z', '20:00:00Z'],
                    WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                },
                name: 'Test',
            },
        ]);

        // Expect the submission button to be called once and be supplied with the partner name
        expect(afterSubmitMock.mock.calls.length).toBe(1);
        expect(afterSubmitMock.mock.calls[0]).toEqual([true, `${apiUrl}/stations`, null]);
    });
});
