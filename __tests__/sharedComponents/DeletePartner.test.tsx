import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import theme from '../../src/theme';
import { ThemeProvider } from 'styled-components';
import { DeletePartner } from '../../src/sharedComponents/DeletePartner';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { mockPartners } from '../../__mocks__/mockPartners';

describe('Provides an interface to submit a new partner', () => {
    const alertOptions = {
        position: positions.TOP_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
    };

    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onGet('/partners').reply(200, mockPartners);
        axiosMock.onDelete(/\/partners\/\d+/).reply(200, mockPartners[0]);
    });

    afterEach(() => {
        axiosMock.reset();
        cleanup();
    });

    it('Should submit partner on input change and button click', async () => {
        const afterSubmitMock = jest.fn();

        const { findByText, getByDisplayValue } = render(
            <ThemeProvider theme={theme}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <KeycloakProvider keycloak={keycloak}>
                        <DeletePartner afterSubmit={afterSubmitMock} />
                    </KeycloakProvider>
                </AlertProvider>
            </ThemeProvider>,
        );

        // Get the selector for selecting which partner to delete
        const select = await waitFor(() => getByDisplayValue('Velg samarbeidspartner'));

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

        await waitFor(() => {
            expect(afterSubmitMock.mock.calls.length).toBe(1);
        });
        expect(afterSubmitMock.mock.calls[0]).toEqual([true]);
    });
});
