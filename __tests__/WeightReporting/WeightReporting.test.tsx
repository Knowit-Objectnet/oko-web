import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { WeightReporting } from '../../src/pages/weightReporting/WeightReporting';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides a page to view the calendar in addition to change log and notifications', () => {
    // router history
    let history: MemoryHistory;

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async ({ url }) => {
            if (url === '/api/withdrawals') {
                return JSON.stringify([
                    {
                        id: '1',
                        start: new Date(),
                        end: new Date(),
                    },
                    {
                        id: '2',
                        start: new Date(),
                        end: new Date(),
                    },
                    {
                        id: '3',
                        weight: 200,
                        start: new Date(),
                        end: new Date(),
                    },
                    {
                        id: '4',
                        weight: 200,
                        start: new Date(),
                        end: new Date(),
                    },
                ]);
            }
            return '';
        });
        history = createMemoryHistory();
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render all withdrawals', async () => {
        const { findAllByText, findAllByPlaceholderText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <Router history={history}>
                    <WeightReporting />
                </Router>
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
