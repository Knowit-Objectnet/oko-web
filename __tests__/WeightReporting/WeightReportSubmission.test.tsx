import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, cleanup } from '../../utils/test-setup';
import { mockReports } from '../../__mocks__/mockReports';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { WeightReportList } from '../../src/pages/weightReporting/WeightReportList';

describe('Provides a component to update a single weight withdrawal', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onPatch('/reports').reply(200, {});
    });

    afterEach(() => {
        axiosMock.reset();
        cleanup();
    });

    it('Should display the weight from the withdrawal which contains weight', async () => {
        const singleReportWithWeigth = [mockReports[0]];

        const { findByText } = render(<WeightReportList header="" reports={singleReportWithWeigth} />);

        const weight = await findByText('200 kg');
        expect(weight).toBeInTheDocument();
    });

    it('Should allow input and submission of a value on a withdrawal without weight', async () => {
        const singleReportWithoutWeigth = [mockReports[1]];

        const { findByText, findByPlaceholderText, findByDisplayValue } = render(
            <WeightReportList header="" reports={singleReportWithoutWeigth} />,
        );

        // Find the input where we can write in a weight
        const input = await findByPlaceholderText('Skriv inn vekt i kg');
        expect(input).toBeInTheDocument();

        fireEvent.change(input, {
            target: { value: 200 },
        });

        // Make sure the 200 we wrote in is displayed
        const weigthInput = await findByDisplayValue('200');
        expect(weigthInput).toBeInTheDocument();

        // Find the submission button
        const button = await findByText('OK');
        expect(button).toBeInTheDocument();

        // Click the submission button
        fireEvent(
            button,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // TODO: missing a way to assert that withdrawal was submitted
    });
});
