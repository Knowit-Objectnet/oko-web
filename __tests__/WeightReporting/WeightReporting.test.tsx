import React from 'react';
import { render, cleanup } from '../../utils/test-setup';
import '@testing-library/jest-dom';
import keycloak from '../../src/keycloak';

import { WeightReporting } from '../../src/pages/weightReporting/WeightReporting';
import { Roles } from '../../src/types';
import { mockReports } from '../../__mocks__/mockReports';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('Provides a page provide and update weight of withdrawals', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onGet('/reports').reply((config) => {
            const queryToDateFilter = config.params?.toDate;
            if (queryToDateFilter) {
                const filteredMockReports = mockReports.filter(
                    (mockReport) => new Date(mockReport.endDateTime) <= new Date(queryToDateFilter),
                );
                return [200, JSON.stringify(filteredMockReports)];
            }
            return [200, ''];
        });

        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Ambassador;
        });

        // Set the groupID to 1 (Fretex)
        keycloak.tokenParsed.GroupID = 1;
    });

    afterEach(() => {
        axiosMock.reset();
        cleanup();
    });

    it('Should render all withdrawals', async () => {
        const { findAllByText, findAllByPlaceholderText } = render(<WeightReporting />);

        const withdrawalsWithWeight = await findAllByText('200 kg');
        withdrawalsWithWeight.forEach((withdrawal) => {
            expect(withdrawal).toBeInTheDocument();
        });

        const withdrawalsWithoutWeight = await findAllByPlaceholderText('Skriv inn vekt i kg');
        withdrawalsWithoutWeight.forEach((withdrawal) => {
            expect(withdrawal).toBeInTheDocument();
        });
    });
});
