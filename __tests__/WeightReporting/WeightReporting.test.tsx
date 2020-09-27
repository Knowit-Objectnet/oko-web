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
        const now = new Date();
        now.setHours(10, 0, 0, 0);
        fetch.mockResponse(async ({ url }) => {
            const parsedUrl = new URL(url);
            if (parsedUrl.pathname.endsWith('/reports/') && parsedUrl.searchParams.get('partnerId') === '1') {
                return JSON.stringify([
                    {
                        reportID: 1,
                        weight: 200,
                        start: '2020-09-23T10:00:00.000Z',
                        end: '2020-09-23T11:00:00.000Z',
                        partner: {
                            id: 1,
                            name: 'fretex',
                        },
                        station: {
                            id: 1,
                            name: 'haraldrud',
                            hours: {
                                MONDAY: ['07:00:00Z', '20:00:00Z'],
                                TUESDAY: ['07:00:00Z', '20:00:00Z'],
                                WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                                THURSDAY: ['07:00:00Z', '20:00:00Z'],
                                FRIDAY: ['07:00:00Z', '20:00:00Z'],
                            },
                        },
                    },
                    {
                        reportID: 2,
                        weight: null,
                        start: '2020-09-23T09:00:00.000Z',
                        end: '2020-09-23T10:00:00.000Z',
                        partner: {
                            id: 1,
                            name: 'fretex',
                        },
                        station: {
                            id: 1,
                            name: 'haraldrud',
                            hours: {
                                MONDAY: ['07:00:00Z', '20:00:00Z'],
                                TUESDAY: ['07:00:00Z', '20:00:00Z'],
                                WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                                THURSDAY: ['07:00:00Z', '20:00:00Z'],
                                FRIDAY: ['07:00:00Z', '20:00:00Z'],
                            },
                        },
                    },
                    {
                        reportID: 3,
                        weight: null,
                        start: '2020-09-24T13:00:00.000Z',
                        end: '2020-09-24T14:30:00.000Z',
                        partner: {
                            id: 1,
                            name: 'fretex',
                        },
                        station: {
                            id: 1,
                            name: 'haraldrud',
                            hours: {
                                MONDAY: ['07:00:00Z', '20:00:00Z'],
                                TUESDAY: ['07:00:00Z', '20:00:00Z'],
                                WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                                THURSDAY: ['07:00:00Z', '20:00:00Z'],
                                FRIDAY: ['07:00:00Z', '20:00:00Z'],
                            },
                        },
                    },
                    {
                        reportID: 4,
                        weight: 200,
                        start: '2020-08-23T12:15:00.000Z',
                        end: '2020-08-23T12:45:00.000Z',
                        partner: {
                            id: 1,
                            name: 'fretex',
                        },
                        station: {
                            id: 1,
                            name: 'haraldrud',
                            hours: {
                                MONDAY: ['07:00:00Z', '20:00:00Z'],
                                TUESDAY: ['07:00:00Z', '20:00:00Z'],
                                WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                                THURSDAY: ['07:00:00Z', '20:00:00Z'],
                                FRIDAY: ['07:00:00Z', '20:00:00Z'],
                            },
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
