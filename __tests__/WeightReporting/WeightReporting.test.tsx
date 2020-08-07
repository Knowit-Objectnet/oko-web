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
            if (url.endsWith('/reports/?partnerId=1')) {
                return JSON.stringify([
                    {
                        reportID: 1,
                        weight: 200,
                        start: new Date(),
                        end: new Date(),
                        partner: {
                            id: 1,
                            name: 'fretex',
                        },
                        station: {
                            id: 1,
                            name: 'haraldrud',
                            openingTime: '08:00:00Z',
                            closingTime: '20:00:00Z',
                        },
                    },
                    {
                        reportID: 2,
                        weight: null,
                        start: new Date(),
                        end: new Date(),
                        partner: {
                            id: 1,
                            name: 'fretex',
                        },
                        station: {
                            id: 1,
                            name: 'haraldrud',
                            openingTime: '08:00:00Z',
                            closingTime: '20:00:00Z',
                        },
                    },
                    {
                        reportID: 3,
                        weight: null,
                        start: new Date(),
                        end: new Date(),
                        partner: {
                            id: 1,
                            name: 'fretex',
                        },
                        station: {
                            id: 1,
                            name: 'haraldrud',
                            openingTime: '08:00:00Z',
                            closingTime: '20:00:00Z',
                        },
                    },
                    {
                        reportID: 4,
                        weight: 200,
                        start: new Date(),
                        end: new Date(),
                        partner: {
                            id: 1,
                            name: 'fretex',
                        },
                        station: {
                            id: 1,
                            name: 'haraldrud',
                            openingTime: '08:00:00Z',
                            closingTime: '20:00:00Z',
                        },
                    },
                ]);
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
            <AlertProvider template={AlertTemplate} {...options}>
                <KeycloakProvider keycloak={keycloak}>
                    <Router history={history}>
                        <WeightReporting />
                    </Router>
                </KeycloakProvider>
            </AlertProvider>,
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
