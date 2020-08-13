import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ModalProvider from '../../src/sharedComponents/Modal/Provider';
import theme from '../../src/theme';
import { ThemeProvider } from 'styled-components';
import { Stations } from '../../src/pages/stations/Stations';
import fetch from 'jest-fetch-mock';
import { apiUrl } from '../../src/types';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides a page to view a list of the stations', () => {
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
            if (url.startsWith(`${apiUrl}/stations`)) {
                return JSON.stringify([
                    {
                        id: 1,
                        name: 'Haraldrud',
                        hours: {
                            MONDAY: ['08:00:00Z', '20:00:00Z'],
                            TUESDAY: ['08:00:00Z', '20:00:00Z'],
                            WEDNESDAY: ['08:00:00Z', '20:00:00Z'],
                            THURSDAY: ['08:00:00Z', '20:00:00Z'],
                            FRIDAY: ['10:00:00Z', '18:00:00Z'],
                        },
                    },
                    {
                        id: 3,
                        name: 'Smestad',
                        hours: {
                            MONDAY: ['10:00:00Z', '20:00:00Z'],
                            TUESDAY: ['10:00:00Z', '20:00:00Z'],
                            WEDNESDAY: ['10:00:00Z', '20:00:00Z'],
                            THURSDAY: ['10:00:00Z', '20:00:00Z'],
                            FRIDAY: ['10:00:00Z', '20:00:00Z'],
                        },
                    },
                ]);
            } else {
                return '';
            }
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render working logout button', async () => {
        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <ModalProvider>
                        <AlertProvider template={AlertTemplate} {...options}>
                            <Stations />
                        </AlertProvider>
                    </ModalProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        const Haraldrud = await findByText('Haraldrud');
        const Smestad = await findByText('Smestad');

        expect(Haraldrud).toBeInTheDocument();
        expect(Smestad).toBeInTheDocument();
    });
});
