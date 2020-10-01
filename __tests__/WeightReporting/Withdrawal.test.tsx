import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { WithdrawalSubmission } from '../../src/pages/weightReporting/WithdrawalSubmission';
import { ThemeProvider } from 'styled-components';
import theme from '../../src/theme';
import { Report } from '../../src/types';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

describe('Provides a component to update a single weight withdrawal', () => {
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

    it('Should display the weight from the withdrawal which contains weight', async () => {
        // Props for the component
        const props: {
            withdrawal: Report;
        } = {
            withdrawal: {
                reportId: 1,
                partnerId: 1,
                eventId: 1,
                station: {
                    id: 1,
                    name: 'Haraldrud',
                    hours: {
                        MONDAY: ['07:00:00Z', '20:00:00Z'],
                        TUESDAY: ['07:00:00Z', '20:00:00Z'],
                        WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                        THURSDAY: ['07:00:00Z', '20:00:00Z'],
                        FRIDAY: ['07:00:00Z', '20:00:00Z'],
                    },
                },
                startDateTime: new Date().toString(),
                endDateTime: new Date().toString(),
                weight: 100,
                reportedDateTime: new Date().toString(),
            },
        };

        // Render component
        const { findByText } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <WithdrawalSubmission {...props} />
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        // Find the box that displays the weight
        const weight = await findByText('100 kg');
        expect(weight).toBeInTheDocument();
    });

    it('Should allow us to input a value and submit it on a withdrawal without weight', async () => {
        // Props for the component
        const props: {
            withdrawal: Report;
        } = {
            withdrawal: {
                reportId: 1,
                eventId: 1,
                partnerId: 1,
                station: {
                    id: 1,
                    name: 'Haraldrud',
                    hours: {
                        MONDAY: ['07:00:00Z', '20:00:00Z'],
                        TUESDAY: ['07:00:00Z', '20:00:00Z'],
                        WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                        THURSDAY: ['07:00:00Z', '20:00:00Z'],
                        FRIDAY: ['07:00:00Z', '20:00:00Z'],
                    },
                },
                startDateTime: new Date().toString(),
                endDateTime: new Date().toString(),
                weight: null,
                reportedDateTime: null,
            },
        };

        // Render component
        const { findByText, findByPlaceholderText, findByDisplayValue } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <WithdrawalSubmission {...props} />
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        // Find the input where we can write in a weight
        const input = await findByPlaceholderText('Skriv inn vektuttak');
        expect(input).toBeInTheDocument();

        // Write in 200 into the input
        await waitFor(() => {
            fireEvent.change(input, {
                target: { value: 200 },
            });
        });

        // Make sure the 200 we wrote in is displayed
        const weight = await findByDisplayValue('200');
        expect(weight).toBeInTheDocument();

        // Find the submission button
        const button = await findByText('OK');
        expect(button).toBeInTheDocument();

        // Click the submission button
        await waitFor(() => {
            fireEvent(
                button,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        // Expect the submission button to be called once and be supplied with the weight and id as argumeents
        // expect(props.onSubmit.mock.calls.length).toBe(1);
        // expect(props.onSubmit.mock.calls[0]).toEqual([200, props.id]);
    });
});
