import React from 'react';
import { render, cleanup, screen, waitFor, fireEvent } from '../../test-utils';
import '@testing-library/jest-dom';
import { DeleteStation } from '../../src/sharedComponents/DeleteStation';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { mockStations } from '../../__mocks__/mockStations';

describe('Provides an interface to submit a new station', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onGet('/stations').reply(200, mockStations);
        axiosMock.onDelete(/\/stations\/\d+/).reply(200, {
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
    });

    afterEach(() => {
        axiosMock.reset();
        cleanup();
    });

    it('Should delete station on input change and button click', async () => {
        const afterSubmitMock = jest.fn();
        render(<DeleteStation afterSubmit={afterSubmitMock} />);

        // Get the selector for selecting which partner to delete
        const select = await screen.findByDisplayValue('Velg stasjon');

        // Select Fretex
        fireEvent.change(select, {
            target: { value: '3' },
        });

        // Find the submission button
        const submitButton = await screen.findByText('Slett');

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
