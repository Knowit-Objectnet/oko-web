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
import { NewStationModal } from '../../src/sharedComponents/NewStation/NewStationModal';

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
                return JSON.stringify({
                    name: 'Test',
                    hours: {
                        MONDAY: ['07:00:00Z', '20:00:00Z'],
                        TUESDAY: ['07:00:00Z', '20:00:00Z'],
                        WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                        THURSDAY: ['07:00:00Z', '20:00:00Z'],
                        FRIDAY: ['07:00:00Z', '20:00:00Z'],
                    },
                });
            } else {
                return '';
            }
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('Should submit station on input changes and button click', async () => {
        const { findByText, findByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...options}>
                    <KeycloakProvider keycloak={keycloak}>
                        <NewStationModal />
                    </KeycloakProvider>
                </AlertProvider>
            </ThemeProvider>,
        );

        // Find the text input for the name
        const nameInput = await findByPlaceholderText('Navn på stasjon');
        expect(nameInput).toBeInTheDocument();

        // Write in the station name Test
        await fireEvent.change(nameInput, {
            target: { value: 'Test' },
        });

        // Find the text input for the address
        const addressInput = await findByPlaceholderText('Adressen til stasjonen');
        expect(addressInput).toBeInTheDocument();

        // Write in the station address Test adresse
        await fireEvent.change(addressInput, {
            target: { value: 'Test adresse' },
        });

        // Find the text input for the ambassador name
        const ambassadorNameInput = await findByPlaceholderText('Navn');
        expect(ambassadorNameInput).toBeInTheDocument();

        // Write in the ambassador name Ola
        await fireEvent.change(ambassadorNameInput, {
            target: { value: 'Ola' },
        });

        // Find the text input for the ambassador phone
        const ambassadorPhoneInput = await findByPlaceholderText('Telefonnummer');
        expect(ambassadorPhoneInput).toBeInTheDocument();

        // Write in the ambassador phone number 40404040
        await fireEvent.change(ambassadorPhoneInput, {
            target: { value: '40404040' },
        });

        // Find the text input for the ambassador mail
        const ambassadorMailInput = await findByPlaceholderText('Mail adresse');
        expect(ambassadorMailInput).toBeInTheDocument();

        // Write in the ambassador email olaRegTest@knowit.no
        await fireEvent.change(ambassadorMailInput, {
            target: { value: 'olaRegTest@knowit.no' },
        });

        // Find the submit button
        const submitButton = await findByText('Legg til stasjon');
        expect(submitButton).toBeInTheDocument();

        // Click the submission button
        await fireEvent(
            submitButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );
    });
});
