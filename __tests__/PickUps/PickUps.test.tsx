import React from 'react';
import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import { apiUrl } from '../../src/types';
import { Notifications } from '../../src/pages/notifications/Notifications';
import { mockApiPickUps } from '../../__mocks__/mockPickUps';
import { mockApiRequests } from '../../__mocks__/mockRequests';
import { render, cleanup } from '../../utils/test-setup';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// Fetch mock to intercept fetch requests.
global.fetch = fetch;

describe('Provides a page to view a list of PickUps', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async ({ url }) => {
            if (url.startsWith(`${apiUrl}/requests/?pickupId=`)) {
                const id = parseInt(url.slice(`${apiUrl}/requests/?pickupId=`.length));
                const filtered = mockApiRequests.filter((mockApiRequest) => mockApiRequest.pickup.id === id);
                return JSON.stringify(filtered);
            } else {
                return JSON.stringify([]);
            }
        });

        axiosMock = new MockAdapter(axios);
        axiosMock.onGet('/pickups').reply(200, JSON.stringify(mockApiPickUps));
    });

    afterEach(() => {
        axiosMock.reset();
        cleanup();
    });

    it('Should render list of PickUps', async () => {
        const { findAllByText } = render(<Notifications />);

        // Check that the correct amount of pickUps from the stations is rendered
        const haraldrudPickUps = await findAllByText('Haraldrud');
        const smestadPickUps = await findAllByText('Smestad');
        expect(haraldrudPickUps.length).toBe(4);
        expect(smestadPickUps.length).toBe(1);

        // Check that the correct amount of Fretex requests is rendered
        const fretexRequests = await findAllByText('Fretex');
        expect(fretexRequests.length).toBe(2);

        // Check that the correct amount of Maritastiftelsen requests is rendered
        const maritastiftelsenRequests = await findAllByText('Maritastiftelsen');
        expect(maritastiftelsenRequests.length).toBe(1);

        // Check that the correct amount of Jobben requests is rendered
        const jobbenRequests = await findAllByText('Jobben');
        expect(jobbenRequests.length).toBe(1);

        // Check that the correct amount of pending requests are shown
        const pendingRequests = await findAllByText('Avventer svar');
        expect(pendingRequests.length).toBe(1);

        // Check that the correct amount of accepted requests are shown
        const acceptedRequests = await findAllByText('Godkjent');
        expect(acceptedRequests.length).toBe(1);

        // Check that the correct amount of rejected requests are shown
        const rejectedRequests = await findAllByText('Avvist');
        expect(rejectedRequests.length).toBe(2);
    });
});
