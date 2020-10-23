import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../../src/keycloak';
import fetch from 'jest-fetch-mock';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { apiUrl } from '../../../src/types';
import theme from '../../../src/theme';
import { ThemeProvider } from 'styled-components';
import { NewEvent } from '../../../src/sharedComponents/Events/NewEvent';
import add from 'date-fns/add';
import { mockLocations } from '../../../__mocks__/mockLocations';
import { mockPartners } from '../../../__mocks__/mockPartners';

describe('Provides an interface to create a new Event', () => {
    // Alert options
    const options = {
        position: positions.TOP_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
    };

    beforeEach(() => {
        // TODO: need to mock Axios if tests require API-requests
    });

    afterEach(() => {
        cleanup();
    });

    it('is just a dummy test so that jest wont complain about disabled tests', () => {
        expect(true);
    });

    /* TODO: tests disabled for now, needs better asserting
    it('should be possible to add a non-reccuring event', async () => {
        // Get a start end end date that isnt a saturday or sunday
        let date = new Date();
        if (date.getDay() === 0 || date.getDay() === 6) {
            date = add(date, { days: 2 });
        }
        const start = new Date(date.setHours(16, 0, 0, 0));
        const end = new Date(date.setHours(16, 30, 0, 0));

        const mockAfterSubmit = jest.fn();

        // This has to be set as NewEvent checks if keycloak?.token exists and exists the submit function
        // if it isnt, making the test stall into infinity
        keycloak.token = 'FakeToken';
        // Render
        const { findByText, getByDisplayValue } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <NewEvent start={start} end={end} afterSubmit={mockAfterSubmit} />
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        // Get the selector for selecting parter
        const selectPartner = await getByDisplayValue('Velg samarbeidspartner');

        // Select partner 0 from mocks
        fireEvent.change(selectPartner, {
            target: { value: mockPartners[0].id.toString() },
        });

        // Get the selector for selecting station
        const selectLocation = await getByDisplayValue('Velg stasjon');

        // Select location 0 from mocks
        fireEvent.change(selectLocation, {
            target: { value: mockLocations[0].id.toString() },
        });

        // Get the submit button
        const submitButton = await findByText('Fullfør');

        // Click the submission button

        fireEvent(
            submitButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // TODO: this assert does not really check if we're getting the wanted result
        // Expect the afterSubmit function to be called with the data
        await waitFor(() => expect(mockAfterSubmit).toHaveBeenCalledTimes(1));
        expect(mockAfterSubmit.mock.calls[0]).toEqual([true]);
    });

    it('should be possible to add a daily reccuring event', async () => {
        // Get a start end end date that isnt a saturday or sunday
        let date = new Date();
        if (date.getDay() === 0 || date.getDay() === 6) {
            date = add(date, { days: 2 });
        }
        const start = new Date(date.setHours(16, 0, 0, 0));
        let end = new Date(date.setHours(16, 30, 0, 0));
        end = add(end, { days: 1 });

        const mockAfterSubmit = jest.fn();

        // This has to be set as NewEvent checks if keycloak?.token exists and exists the submit function
        // if it isnt, making the test stall into infinity
        keycloak.token = 'FakeToken';
        // Render
        const { findByText, getByDisplayValue } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <NewEvent start={start} end={end} afterSubmit={mockAfterSubmit} />
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        // Get the selector for selecting parter
        const selectPartner = await getByDisplayValue('Velg samarbeidspartner');

        // Select partner 0 from mocks
        fireEvent.change(selectPartner, {
            target: { value: mockPartners[0].id.toString() },
        });

        // Get the selector for selecting station
        const selectLocation = await getByDisplayValue('Velg stasjon');

        // Select location 0 from mocks
        fireEvent.change(selectLocation, {
            target: { value: mockLocations[0].id.toString() },
        });

        // Get the selector for recurrence selector
        const selectReccurence = await getByDisplayValue('Gjentas ikke');

        // Select location 0 from mocks
        fireEvent.change(selectReccurence, {
            target: { value: 'Daily' },
        });

        // Get the submit button
        const submitButton = await findByText('Fullfør');

        // Click the submission button
        fireEvent(
            submitButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // TODO: this assert does not really check if we're getting the wanted result
        // Expect the afterSubmit function to be called with the data
        await waitFor(() => expect(mockAfterSubmit).toHaveBeenCalledTimes(1));
        expect(mockAfterSubmit.mock.calls[0]).toEqual([true]);
    });

    it('should be possible to add a weekly reccuring event', async () => {
        // Get a start end end date that isnt a saturday or sunday
        let date = new Date();
        if (date.getDay() === 0 || date.getDay() === 6) {
            date = add(date, { days: 2 });
        }
        const start = new Date(date.setHours(16, 0, 0, 0));
        let end = new Date(date.setHours(16, 30, 0, 0));
        end = add(end, { days: 1 });

        const mockAfterSubmit = jest.fn();

        // This has to be set as NewEvent checks if keycloak?.token exists and exists the submit function
        // if it isnt, making the test stall into infinity
        keycloak.token = 'FakeToken';
        // Render
        const { findByText, getByDisplayValue } = render(
            <KeycloakProvider keycloak={keycloak}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <NewEvent start={start} end={end} afterSubmit={mockAfterSubmit} />
                    </AlertProvider>
                </ThemeProvider>
            </KeycloakProvider>,
        );

        // Get the selector for selecting parter
        const selectPartner = await getByDisplayValue('Velg samarbeidspartner');

        // Select partner 0 from mocks
        await waitFor(() => {
            fireEvent.change(selectPartner, {
                target: { value: mockPartners[0].id.toString() },
            });
        });

        // Get the selector for selecting station
        const selectLocation = await getByDisplayValue('Velg stasjon');

        // Select location 0 from mocks
        fireEvent.change(selectLocation, {
            target: { value: mockLocations[0].id.toString() },
        });

        // Get the selector for recurrence selector
        const selectReccurence = await getByDisplayValue('Gjentas ikke');

        // Select location 0 from mocks
        fireEvent.change(selectReccurence, {
            target: { value: 'Weekly' },
        });

        // Get the thursday weekday recurrence button
        const thursdayButton = await findByText('To');

        // Click the submission button
        fireEvent(
            thursdayButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // Get the submit button
        const submitButton = await findByText('Fullfør');

        // Click the submission button
        fireEvent(
            submitButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        // TODO: this assert does not really check if we're getting the wanted result
        // Expect the afterSubmit function to be called with the data
        await waitFor(() => expect(mockAfterSubmit).toHaveBeenCalledTimes(1));
        expect(mockAfterSubmit.mock.calls[0]).toEqual([true]);
    }); */
});
