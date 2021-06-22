import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Kalender from '../../kalender';
import { cleanup, render, setupUseAuthMock } from '../../../../test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { mockStations } from '../../../../__mocks__/_deprecated/mockStations';
import { mockApiEvents } from '../../../../__mocks__/_deprecated/mockEvents';

describe('Provides a page to view the calendar', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onGet('/stations').reply(200, mockStations);
        axiosMock.onGet('/events').reply(200, mockApiEvents);
    });

    afterEach(() => {
        axiosMock.reset();
        cleanup();
    });

    it('Should render without errors', () => {
        setupUseAuthMock();

        render(
            <MemoryRouter>
                <Kalender />
            </MemoryRouter>,
        );
    });
});