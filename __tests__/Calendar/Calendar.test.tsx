import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Calendar } from '../../src/pages/calendar/Calendar';
import { cleanup, render } from '../../test-utils';

describe('Provides a page to view the calendar', () => {
    afterEach(() => {
        cleanup();
    });

    it('Should render without errors', async () => {
        render(
            <MemoryRouter>
                <Calendar />
            </MemoryRouter>,
        );
    });
});
