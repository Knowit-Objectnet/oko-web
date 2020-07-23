import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { NewPartner } from '../../src/pages/MyPage/NewPartner';
import {positions, Provider as AlertProvider, transitions} from "react-alert";
import AlertTemplate from "react-alert-template-basic";

describe('Provides a page to view the calendar in addition to change log and notifications', () => {
    // Alert options
    const options = {
        position: positions.TOP_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
    };

    afterEach(() => {
        cleanup();
    });

    it('Should submit partner on input change and button click', async () => {
        // mock function for the submission
        const mockSubmit = jest.fn();
        const { findByText, findByPlaceholderText } = render(
            <AlertProvider template={AlertTemplate} {...options}>
                <KeycloakProvider keycloak={keycloak}>
                    <NewPartner onSubmit={mockSubmit} />
                </KeycloakProvider>
            </AlertProvider>,
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
        expect(mockSubmit.mock.calls.length).toBe(1);
        expect(mockSubmit.mock.calls[0]).toEqual(['Test', null]);
    });
});
