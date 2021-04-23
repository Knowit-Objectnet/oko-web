import React from 'react';
import { render, screen, cleanup, setupUseAuthMock } from '../../../test-utils';
import '@testing-library/jest-dom';
import { Stations } from '../../../src/pages/stations/Stations';
import resetAllMocks = jest.resetAllMocks;
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('Provides a page to view a list of the stations', () => {
    afterEach(() => {
        resetAllMocks();
        cleanup();
    });

    it('Should render list of stations', async () => {
        setupUseAuthMock();

        new MockAdapter(axios).onGet('/stations').reply(200, [
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

        render(<Stations />);

        const Haraldrud = await screen.findByText('Haraldrud');
        const Smestad = await screen.findByText('Smestad');

        expect(Haraldrud).toBeInTheDocument();
        expect(Smestad).toBeInTheDocument();
    });
});
