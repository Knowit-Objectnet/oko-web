import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { NewPartner } from '../../src/sharedComponents/NewPartner';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { apiUrl } from '../../src/types';
import fetch from 'jest-fetch-mock';
import theme from '../../src/theme';
import { ThemeProvider } from 'styled-components';

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
        fetch.mockResponse(async ({ url }) => {
            if (url.startsWith(`${apiUrl}/partners`)) {
                return JSON.stringify('');
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
        const beforeSubmitMock = jest.fn();
        const afterSubmitMock = jest.fn();
        const { findByText, findByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...options}>
                    <KeycloakProvider keycloak={keycloak}>
                        <NewPartner beforeSubmit={beforeSubmitMock} afterSubmit={afterSubmitMock} />
                    </KeycloakProvider>
                </AlertProvider>
            </ThemeProvider>,
        );

        // Find the text input for the name
        const input = await findByPlaceholderText('Navn på organisasjonen');
        expect(input).toBeInTheDocument();

        // Write in the partner name Test
        await waitFor(() => {
            fireEvent.change(input, {
                target: { value: 'Test' },
            });
        });

        // Find the submission button
        const submitButton = await findByText('Legg til samarbeidspartner');

        // Click the submission button
        await waitFor(() => {
            fireEvent(
                submitButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Expect the submission button to be called once and be supplied with the partner name
        expect(beforeSubmitMock.mock.calls.length).toBe(1);
        expect(beforeSubmitMock.mock.calls[0]).toEqual([`${apiUrl}/partners/`, 'Test', null]);

        // Expect the submission button to be called once and be supplied with the partner name
        expect(afterSubmitMock.mock.calls.length).toBe(1);
        expect(afterSubmitMock.mock.calls[0]).toEqual([true, `${apiUrl}/partners/`, null]);
    });
});
