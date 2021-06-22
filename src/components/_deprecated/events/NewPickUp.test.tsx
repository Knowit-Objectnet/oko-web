import React from 'react';
import '@testing-library/jest-dom';
import add from 'date-fns/add';
import { render, screen, cleanup, waitFor, fireEvent, setupUseAuthMock } from '../../../../test-utils';
import { NewPickUp } from './NewPickUp';
import { mockStations } from '../../../../__mocks__/_deprecated/mockStations';
import MockAdapter from 'axios-mock-adapter';
import axios, { AxiosRequestConfig } from 'axios';
import resetAllMocks = jest.resetAllMocks;

describe('Provides an interface to create a pickup/Extra event', () => {
    afterEach(() => {
        resetAllMocks();
        cleanup();
    });

    it('should be possible to add pickup/extra event', async () => {
        setupUseAuthMock({ aktorId: mockStations[0].id.toString() });

        new MockAdapter(axios).onPost('/pickups').reply((config: AxiosRequestConfig) => {
            return [
                200,
                JSON.stringify({
                    id: -1,
                    startDateTime: config.data.startDateTime,
                    endDateTime: config.data.endDateTime,
                    station: mockStations[0],
                    chosenPartner: null,
                }),
            ];
        });

        // Get a start end end date that isnt a saturday or sunday
        let date = new Date();
        if (date.getDay() === 0 || date.getDay() === 6) {
            date = add(date, { days: 2 });
        }
        const start = new Date(date.setHours(16, 0, 0, 0));
        const end = new Date(date.setHours(16, 30, 0, 0));

        const mockAfterSubmit = jest.fn();

        render(<NewPickUp start={start} end={end} afterSubmit={mockAfterSubmit} />);

        const messageText = await screen.findByPlaceholderText('Meldingstekst (maks 200 tegn)');

        // Set the message text
        fireEvent.change(messageText, {
            target: { value: 'Ting må hentes' },
        });

        // Get the submit button
        const submitButton = await screen.findByText('Send');

        // Click the submission button
        fireEvent(
            submitButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Expect the afterSubmit function to be called with the data
        await waitFor(() => expect(mockAfterSubmit).toHaveBeenCalledTimes(1));
        expect(mockAfterSubmit.mock.calls[0]).toEqual([true]);
    });
});
