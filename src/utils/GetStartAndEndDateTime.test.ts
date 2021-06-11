import '@testing-library/jest-dom';
import add from 'date-fns/add';

import { getStartAndEndDateTime } from './getStartAndEndDateTime';

describe('Provides utility functions', () => {
    it('Should give a start equal to closest quarter and end equal to closest quarter+1 hour if date is less than 1 hour away from max', async () => {
        // Get date object for test
        const date = new Date();
        date.setHours(16, 20, 0, 0);

        // Get result from function
        const { start, end } = getStartAndEndDateTime(date);

        expect(start.toISOString()).toBe(new Date(date.setHours(16, 30, 0, 0)).toISOString());
        expect(end.toISOString()).toBe(add(date, { hours: 1 }).toISOString());
    });

    it('Should give a start equal to min and end equal to min+1 if date is less than min', async () => {
        // Get date object for test
        const date = new Date();
        date.setHours(6, 0, 0, 0);

        // Get result from function
        const { start, end } = getStartAndEndDateTime(date);

        expect(start.toISOString()).toBe(new Date(date.setHours(7, 0, 0, 0)).toISOString());
        expect(end.toISOString()).toBe(add(date, { hours: 1 }).toISOString());
    });

    it('Should give a start equal to max-1 and end equal to max if date is more than max', async () => {
        // Get date object for test
        const date = new Date();
        date.setHours(21, 0, 0, 0);

        // Get result from function
        const { start, end } = getStartAndEndDateTime(date);

        expect(start.toISOString()).toBe(new Date(date.setHours(19, 0, 0, 0)).toISOString());
        expect(end.toISOString()).toBe(new Date(date.setHours(20, 0, 0, 0)).toISOString());
    });
});
