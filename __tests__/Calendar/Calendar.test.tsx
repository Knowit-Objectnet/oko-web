import React from 'react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Calendar } from '../../src/pages/calendar/Calendar';
import { render, cleanup } from '../../test-utils';

describe('Provides a page to view the calendar', () => {
    let history: MemoryHistory;

    beforeEach(() => {
        history = createMemoryHistory();
    });

    afterEach(() => {
        cleanup();
    });

    it('Should render without errors', async () => {
        render(
            <Router history={history}>
                <Calendar />
            </Router>,
        );
    });
});
