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
import fetch from 'jest-fetch-mock';
import { apiUrl } from '../../src/types';
import { Pickups } from '../../src/pages/pickups/Pickups';
import { mockApiPickUps } from '../../__mocks__/mockPickUps';
import { mockApiRequests } from '../../__mocks__/mockRequests';

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
            if (url.startsWith(`${apiUrl}/requests/?pickupId=`)) {
                const id = parseInt(url.slice(`${apiUrl}/requests/?pickupId=`.length));
                const filtered = mockApiRequests.filter((mockApiRequest) => mockApiRequest.pickup.id === id);
                return JSON.stringify(filtered);
            } else if (url.startsWith(`${apiUrl}/pickups`)) {
                return JSON.stringify(mockApiPickUps);
            } else {
                return JSON.stringify([]);
            }
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render working logout button', async () => {
        const { findAllByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <ModalProvider>
                        <AlertProvider template={AlertTemplate} {...options}>
                            <Pickups />
                        </AlertProvider>
                    </ModalProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        // Check that the correct amount of pickUps from the stations is rendered
        const haraldrudPickUps = await findAllByText('Haraldrud');
        const smestadPickUps = await findAllByText('Smestad');
        expect(haraldrudPickUps.length).toBe(4);
        expect(smestadPickUps.length).toBe(1);

        // Check that the correct amount of Fretex requests is rendered
        const fretexRequests = await findAllByText('Fretex');
        expect(fretexRequests.length).toBe(2);

        // Check that the correct amount of Maritastiftelsen requests is rendered
        const maritastiftelsenRequests = await findAllByText('Maritastiftelsen');
        expect(maritastiftelsenRequests.length).toBe(1);

        // Check that the correct amount of Jobben requests is rendered
        const jobbenRequests = await findAllByText('Jobben');
        expect(jobbenRequests.length).toBe(1);

        // Check that the correct amount of pending requests are shown
        const pendingRequests = await findAllByText('Avventer svar');
        expect(pendingRequests.length).toBe(1);

        // Check that the correct amount of accepted requests are shown
        const acceptedRequests = await findAllByText('Godkjent');
        expect(acceptedRequests.length).toBe(1);

        // Check that the correct amount of rejected requests are shown
        const rejectedRequests = await findAllByText('Avvist');
        expect(rejectedRequests.length).toBe(2);
    });
});
