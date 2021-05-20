import React from 'react';
import '@testing-library/jest-dom';
import { Notifications } from '../../../src/pages/notifications/Notifications';
import { mockApiPickUps } from '../../../__mocks__/mockPickUps';
import { mockApiRequests } from '../../../__mocks__/mockRequests';
import { render, cleanup, screen, setupUseAuthMock } from '../../../test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import resetAllMocks = jest.resetAllMocks;

describe('Provides a page to view a list of PickUps', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onGet('/pickups').reply(200, JSON.stringify(mockApiPickUps));
        axiosMock.onGet('/requests').reply((config) => {
            const filteredMockRequests = mockApiRequests.filter(
                (mockApiRequest) => mockApiRequest.pickup.id === config.params?.pickupId,
            );
            return [200, JSON.stringify(filteredMockRequests)];
        });
    });

    afterEach(() => {
        axiosMock.reset();
        resetAllMocks();
        cleanup();
    });

    it('Should render list of PickUps with Requests for Admin', async () => {
        setupUseAuthMock({ isAdmin: true });

        render(<Notifications />);

        // Check that the correct amount of pickUps from the stations is rendered
        const haraldrudPickUps = await screen.findAllByText('Haraldrud');
        const smestadPickUps = await screen.findAllByText('Smestad');
        expect(haraldrudPickUps.length).toBe(4);
        expect(smestadPickUps.length).toBe(1);

        // Check that the correct amount of Fretex requests is rendered
        const fretexRequests = await screen.findAllByText('Fretex');
        expect(fretexRequests.length).toBe(2);

        // Check that the correct amount of Maritastiftelsen requests is rendered
        const maritastiftelsenRequests = await screen.findAllByText('Maritastiftelsen');
        expect(maritastiftelsenRequests.length).toBe(1);

        // Check that the correct amount of Jobben requests is rendered
        const jobbenRequests = await screen.findAllByText('Jobben');
        expect(jobbenRequests.length).toBe(1);

        // Check that the correct amount of pending requests are shown
        const pendingRequests = await screen.findAllByText('Avventer svar');
        expect(pendingRequests.length).toBe(1);

        // Check that the correct amount of accepted requests are shown
        const acceptedRequests = await screen.findAllByText('Godkjent');
        expect(acceptedRequests.length).toBe(1);

        // Check that the correct amount of rejected requests are shown
        const rejectedRequests = await screen.findAllByText('Avvist');
        expect(rejectedRequests.length).toBe(2);
    });
});
