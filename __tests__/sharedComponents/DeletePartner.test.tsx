import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { apiUrl } from '../../src/types';
import fetch from 'jest-fetch-mock';
import theme from '../../src/theme';
import { ThemeProvider } from 'styled-components';
import { DeletePartnerModal } from '../../src/sharedComponents/DeletePartnerModal';
import { mockPartners } from '../../__mocks__/mockPartners';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides an interface to submit a new partner', () => {
    // Alert options
    const options = {
        position: positions.TOP_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
    };

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async (req) => {
            if (req.url.startsWith(`${apiUrl}/partners`)) {
                if (req.method === 'GET') {
                    return JSON.stringify(mockPartners);
                } else if (req.method === 'DELETE') {
                    return JSON.stringify(mockPartners[0]);
                } else {
                    return '';
                }
            } else {
                return '';
            }
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('Should submit partner on input change and button click', async () => {
        // mock function for the submission
        const afterSubmitMock = jest.fn();
        const { findByText, getByDisplayValue } = render(
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...options}>
                    <KeycloakProvider keycloak={keycloak}>
                        <DeletePartnerModal afterSubmit={afterSubmitMock} />
                    </KeycloakProvider>
                </AlertProvider>
            </ThemeProvider>,
        );

        // Get the selector for selecting which partner to delete
        const select = await getByDisplayValue('Velg samarbeidspartner');

        // Select Fretex
        fireEvent.change(select, {
            target: { value: '3' },
        });

        // Find the submission button
        const submitButton = await findByText('Slett');

        // Click the submission button
        fireEvent(
            submitButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Expect the submission button to be called once and be supplied with the partner name
        await waitFor(() => {
            expect(afterSubmitMock.mock.calls.length).toBe(1);
        });
        expect(afterSubmitMock.mock.calls[0]).toEqual([true]);
    });
});
