import React from 'react';
import { render, screen, cleanup } from '../../../test-utils';
import '@testing-library/jest-dom';
import { Stations } from '../../../src/pages/stations/Stations';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Provides a page to view a list of the stations', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onGet('/stations').reply(200, [
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
    });

    afterEach(() => {
        axiosMock.restore();
        cleanup();
    });

    it('Should render list of stations', async () => {
        render(<Stations />);

        const Haraldrud = await screen.findByText('Haraldrud');
        const Smestad = await screen.findByText('Smestad');

        expect(Haraldrud).toBeInTheDocument();
        expect(Smestad).toBeInTheDocument();
    });
});
