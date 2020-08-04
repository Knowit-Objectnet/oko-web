import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { WithdrawalSubmission } from '../../src/pages/weightReporting/WithdrawalSubmission';

describe('Provides a page to view the calendar in addition to change log and notifications', () => {
    afterEach(() => {
        cleanup();
    });

    it('Should display the weight from the withdrawal which contains weight', async () => {
        // Props for the component
        const props = {
            id: 1,
            weight: 100,
            start: new Date(),
            end: new Date(),
            onSubmit: jest.fn(),
            partner: {
                id: 1,
                name: 'fretex',
            },
            location: {
                id: 1,
                name: 'Haraldrud',
                openingTime: '08:00:00Z',
                closingTime: '20:00:00Z',
            },
        };

        // Render component
        const { findByText } = render(<WithdrawalSubmission {...props} />);

        // Find the box that displays the weight
        const weight = await findByText('100 kg');
        expect(weight).toBeInTheDocument();
    });

    it('Should allow us to input a value and submit it on a withdrawal without weight', async () => {
        // Props for the component
        const props = {
            id: 1,
            weight: null,
            start: new Date(),
            end: new Date(),
            onSubmit: jest.fn(),
            partner: {
                id: 1,
                name: 'fretex',
            },
            location: {
                id: 1,
                name: 'Haraldrud',
                openingTime: '08:00:00Z',
                closingTime: '20:00:00Z',
            },
        };

        // Render component
        const { findByText, findByPlaceholderText, findByDisplayValue } = render(<WithdrawalSubmission {...props} />);

        // Find the input where we can write in a weight
        const input = await findByPlaceholderText('Skriv inn vektuttak');
        expect(input).toBeInTheDocument();

        // Write in 200 into the input
        await waitFor(() => {
            fireEvent.change(input, {
                target: { value: 200 },
            });
        });

        // Make sure the 200 we wrote in is displayed
        const weight = await findByDisplayValue('200');
        expect(weight).toBeInTheDocument();

        // Find the submission button
        const button = await findByText('OK');
        expect(button).toBeInTheDocument();

        // Click the submission button
        await waitFor(() => {
            fireEvent(
                button,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Expect the submission button to be called once and be supplied with the weight and id as argumeents
        expect(props.onSubmit.mock.calls.length).toBe(1);
        expect(props.onSubmit.mock.calls[0]).toEqual([200, props.id]);
    });
});
