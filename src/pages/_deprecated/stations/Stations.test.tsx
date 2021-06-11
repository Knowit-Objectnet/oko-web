import React from 'react';
import { render, screen, cleanup, setupUseAuthMock } from '../../../../test-utils';
import '@testing-library/jest-dom';
import { Stations } from './Stations';
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

        new MockAdapter(axios).onGet('/stasjoner').reply(200, [
            {
                id: '81624939-9509-40f2-96cb-6930140e0c5f',
                navn: 'Haraldrud',
                kontaktPersoner: [],
                type: 'GJENBRUK',
            },
            {
                id: 'b12e0e71-c171-48cf-8f49-6bba6150a5d4',
                navn: 'Smestad',
                kontaktPersoner: [],
                type: 'GJENBRUK',
            },
        ]);

        render(<Stations />);

        const Haraldrud = await screen.findByText('Haraldrud');
        const Smestad = await screen.findByText('Smestad');

        expect(Haraldrud).toBeInTheDocument();
        expect(Smestad).toBeInTheDocument();
    });
});
