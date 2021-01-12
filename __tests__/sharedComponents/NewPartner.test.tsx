import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '../../utils/test-setup';
import '@testing-library/jest-dom';
import { NewPartner } from '../../src/sharedComponents/NewPartner';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('Provides an interface to submit a new partner', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onPost('/partners').reply(200, {});
    });

    afterEach(() => {
        axiosMock.reset();
        cleanup();
    });

    test('Should submit partner on input change and button click', async () => {
        const afterSubmitMock = jest.fn();

        const { findByText, findByPlaceholderText } = render(<NewPartner afterSubmit={afterSubmitMock} />);

        // Find the text input for the name
        const input = await findByPlaceholderText('Navn på organisasjonen');
        expect(input).toBeInTheDocument();

        // Write in the partner name Test
        fireEvent.change(input, {
            target: { value: 'Test' },
        });

        // Find the submission button
        const submitButton = await findByText('Legg til samarbeidspartner');

        fireEvent(
            submitButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        await waitFor(() => expect(afterSubmitMock.mock.calls.length).toBe(1));
        expect(afterSubmitMock.mock.calls[0]).toEqual([true]);
    });
});
