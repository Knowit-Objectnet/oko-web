import React from 'react';
import { render, cleanup, screen, setupUseAuthMock } from '../../../test-utils';
import '@testing-library/jest-dom';
import { WeightReporting } from '../../../src/pages/_deprecated/weightReporting/WeightReporting';
import { mockReports } from '../../../__mocks__/_deprecated/mockReports';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import resetAllMocks = jest.resetAllMocks;

describe('Provides a page provide and update weight of withdrawals', () => {
    afterEach(() => {
        resetAllMocks();
        cleanup();
    });

    it('Should render all withdrawals', async () => {
        new MockAdapter(axios).onGet('/reports').reply((config) => {
            const queryToDateFilter = config.params?.toDate;
            if (queryToDateFilter) {
                const filteredMockReports = mockReports.filter(
                    (mockReport) => new Date(mockReport.endDateTime) <= new Date(queryToDateFilter),
                );
                return [200, JSON.stringify(filteredMockReports)];
            }
            return [200, ''];
        });

        setupUseAuthMock({ isStasjon: true, aktorId: 1 });

        render(<WeightReporting />);

        const withdrawalsWithWeight = await screen.findAllByText('200 kg');
        withdrawalsWithWeight.forEach((withdrawal) => {
            expect(withdrawal).toBeInTheDocument();
        });

        const withdrawalsWithoutWeight = await screen.findAllByPlaceholderText('Skriv inn vekt i kg');
        withdrawalsWithoutWeight.forEach((withdrawal) => {
            expect(withdrawal).toBeInTheDocument();
        });
    });
});
