import React from 'react';
import { render, screen, cleanup, waitFor, fireEvent } from '../../../test-utils';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { NewStation } from '../../../src/pages/_deprecated/stations/NewStation';

describe('Provides an interface to submit a new station', () => {
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
        render(<NewStation afterSubmit={afterSubmitMock} />);

        // Find the text input for the name
        const nameInput = await screen.findByPlaceholderText('Navn på stasjon');
        expect(nameInput).toBeInTheDocument();

        // Write in the station name Test
        fireEvent.change(nameInput, {
            target: { value: 'Test' },
        });

        // Find the text input for the address
        const addressInput = await screen.findByPlaceholderText('Adressen til stasjonen');
        expect(addressInput).toBeInTheDocument();

        // Write in the station address Test adresse
        fireEvent.change(addressInput, {
            target: { value: 'Test adresse' },
        });

        // Find the text input for the ambassador name
        const ambassadorNameInput = await screen.findByPlaceholderText('Navn');
        expect(ambassadorNameInput).toBeInTheDocument();

        // Write in the ambassador name Ola
        fireEvent.change(ambassadorNameInput, {
            target: { value: 'Ola' },
        });

        // Find the text input for the ambassador phone
        const ambassadorPhoneInput = await screen.findByPlaceholderText('Telefonnummer');
        expect(ambassadorPhoneInput).toBeInTheDocument();

        // Write in the ambassador phone number 40404040
        fireEvent.change(ambassadorPhoneInput, {
            target: { value: '40404040' },
        });

        // Find the text input for the ambassador mail
        const ambassadorMailInput = await screen.findByPlaceholderText('E-postadresse');
        expect(ambassadorMailInput).toBeInTheDocument();

        // Write in the ambassador email olaRegTest@knowit.no
        fireEvent.change(ambassadorMailInput, {
            target: { value: 'olaRegTest@knowit.no' },
        });

        // Find the submit button
        const submitButton = await screen.findByText('Legg til stasjon');
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
