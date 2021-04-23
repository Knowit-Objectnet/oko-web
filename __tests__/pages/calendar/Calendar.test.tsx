import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Calendar } from '../../../src/pages/calendar/Calendar';
import { cleanup, render, setupUseAuthMock } from '../../../test-utils';
import resetAllMocks = jest.resetAllMocks;

describe('Provides a page to view the calendar', () => {
    afterEach(() => {
        resetAllMocks();
        cleanup();
    });

    it('Should render without errors', async () => {
        setupUseAuthMock();

        render(
            <MemoryRouter>
                <Calendar />
            </MemoryRouter>,
        );
    });
});
