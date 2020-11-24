import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { WeightReporting } from '../../src/pages/weightReporting/WeightReporting';
import { Roles } from '../../src/types';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import theme from '../../src/theme';
import { ThemeProvider } from 'styled-components';
import { mockReports } from '../../__mocks__/mockReports';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides a page provide and update weight of withdrawals', () => {
    // router history
    let history: MemoryHistory;

    // Alert options
    const options = {
        position: positions.TOP_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
    };

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async ({ url }) => {
            const parsedUrl = new URL(url);
            if (parsedUrl.pathname.endsWith('/reports/') && parsedUrl.searchParams.get('partnerId') === '1') {
                const queryToDateFilter = parsedUrl.searchParams.get('toDate');
                if (queryToDateFilter) {
                    const withdrawals = mockReports.filter(
                        (w) => new Date(w.endDateTime) <= new Date(queryToDateFilter),
                    );
                    return JSON.stringify(withdrawals);
                }

                return JSON.stringify(mockReports);
            }
            return '';
        });
        history = createMemoryHistory();

        keycloak.hasRealmRole = jest.fn((role: string) => {
            return role === Roles.Ambassador;
        });

        // Set the groupID to 1 (Fretex)
        keycloak.tokenParsed.GroupID = 1;
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render all withdrawals', async () => {
        const { findAllByText, findAllByPlaceholderText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <Router history={history}>
                            <WeightReporting />
                        </Router>
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        const withdrawalsWithWeight = await findAllByText('200 kg');
        withdrawalsWithWeight.forEach((withdrawal) => {
            expect(withdrawal).toBeInTheDocument();
        });

        const withdrawalsWithoutWeight = await findAllByPlaceholderText('Skriv inn vektuttak');
        withdrawalsWithoutWeight.forEach((withdrawal) => {
            expect(withdrawal).toBeInTheDocument();
        });
    });
});
