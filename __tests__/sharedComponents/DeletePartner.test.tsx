import React from 'react';
import { render, cleanup, screen, waitFor, fireEvent } from '../../test-utils';
import '@testing-library/jest-dom';
import { DeletePartner } from '../../src/sharedComponents/DeletePartner';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { mockPartners } from '../../__mocks__/mockPartners';

describe('Provides an interface to submit a new partner', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onGet('/partners').reply(200, mockPartners);
        axiosMock.onDelete(/\/partners\/\d+/).reply(200, mockPartners[0]);
    });

    afterEach(() => {
        axiosMock.reset();
        cleanup();
    });

    it('Should submit partner on input change and button click', async () => {
        const afterSubmitMock = jest.fn();

        render(<DeletePartner afterSubmit={afterSubmitMock} />);

        // Get the selector for selecting which partner to delete
        const select = await screen.findByDisplayValue('Velg samarbeidspartner');

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
