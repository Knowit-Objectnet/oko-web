import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../src/keycloak';
import { createMemoryHistory, MemoryHistory } from 'history';

import { Calendar } from '../../src/pages/calendar/Calendar';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ModalProvider from '../../src/sharedComponents/Modal/Provider';

describe('Provides a page to view the calendar', () => {
    let history: MemoryHistory;

    const alertOptions = {
        position: positions.TOP_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
    };

    beforeEach(() => {
        history = createMemoryHistory();
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render without errors', async () => {
        render(
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <ModalProvider>
                    <KeycloakProvider keycloak={keycloak}>
                        <Router history={history}>
                            <Calendar />
                        </Router>
                    </KeycloakProvider>
                </ModalProvider>
            </AlertProvider>,
        );
    });
});
