import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import theme from '../../src/theme';
import { ThemeProvider } from 'styled-components';
import { NewStation } from '../../src/sharedComponents/NewStation/NewStation';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('Provides an interface to submit a new station', () => {
    // Alert options
    const options = {
        position: positions.TOP_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
    };

    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onPost('/stations').reply(200, {});
    });

    afterEach(() => {
        axiosMock.reset();
        cleanup();
    });

    it('Should submit station on input changes and button click', async () => {
        // mock function for the submission
        const afterSubmitMock = jest.fn();
        const { findByText, findByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...options}>
                    <KeycloakProvider keycloak={keycloak}>
                        <NewStation afterSubmit={afterSubmitMock} />
                    </KeycloakProvider>
                </AlertProvider>
            </ThemeProvider>,
        );

        // Find the text input for the name
        const nameInput = await findByPlaceholderText('Navn på stasjon');
        expect(nameInput).toBeInTheDocument();

        // Write in the station name Test
        fireEvent.change(nameInput, {
            target: { value: 'Test' },
        });

        // Find the text input for the address
        const addressInput = await findByPlaceholderText('Adressen til stasjonen');
        expect(addressInput).toBeInTheDocument();

        // Write in the station address Test adresse
        fireEvent.change(addressInput, {
            target: { value: 'Test adresse' },
        });

        // Find the text input for the ambassador name
        const ambassadorNameInput = await findByPlaceholderText('Navn');
        expect(ambassadorNameInput).toBeInTheDocument();

        // Write in the ambassador name Ola
        fireEvent.change(ambassadorNameInput, {
            target: { value: 'Ola' },
        });

        // Find the text input for the ambassador phone
        const ambassadorPhoneInput = await findByPlaceholderText('Telefonnummer');
        expect(ambassadorPhoneInput).toBeInTheDocument();

        // Write in the ambassador phone number 40404040
        fireEvent.change(ambassadorPhoneInput, {
            target: { value: '40404040' },
        });

        // Find the text input for the ambassador mail
        const ambassadorMailInput = await findByPlaceholderText('Mail adresse');
        expect(ambassadorMailInput).toBeInTheDocument();

        // Write in the ambassador email olaRegTest@knowit.no
        fireEvent.change(ambassadorMailInput, {
            target: { value: 'olaRegTest@knowit.no' },
        });

        // Find the submit button
        const submitButton = await findByText('Legg til stasjon');
        expect(submitButton).toBeInTheDocument();

        // Click the submission button
        fireEvent(
            submitButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        await waitFor(() => {
            expect(afterSubmitMock.mock.calls.length).toBe(1);
        });
        expect(afterSubmitMock.mock.calls[0]).toEqual([true]);
    });
});
