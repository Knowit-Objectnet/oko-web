import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';

import { DeleteToAPI } from '../../src/utils/DeleteToAPI';
import { FetchError } from '../../src/utils/FetchError';

global.fetch = fetch;

describe('Provides utility functions', () => {
    const apiUrl = '/test';

    const token = 'fakeToken';

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async ({ url }) => {
            if (url === apiUrl) {
                return { status: 200, body: '' };
            } else if (url === '/500') {
                return { status: 500 };
            } else if (url === '/401') {
                return { status: 401 };
            } else if (url === '/403') {
                return { status: 403 };
            }
            return { status: 404, body: '' };
        });
    });

    it('Should allow data to be deleted from API', async () => {
        try {
            await DeleteToAPI(apiUrl, token);
        } catch (err) {
            console.log(err);
            fail('DELETE failed');
        }
    });

    it('should throw 500 FetchError on HTTP error 500', async () => {
        try {
            await DeleteToAPI('/500', token);
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(500);
            expect(error.message).toBe('Internal Server Error');
        }
    });

    it('should throw 401 FetchError on HTTP error 401', async () => {
        try {
            await DeleteToAPI('/401', token);
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(401);
            expect(error.message).toBe('Invalid token');
        }
    });

    it('should throw 403 FetchError on HTTP error 403', async () => {
        try {
            await DeleteToAPI('/403', token);
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(403);
            expect(error.message).toBe('Forbidden, insufficient permissions');
        }
    });

    it('should throw 404 FetchError on HTTP error 404', async () => {
        try {
            await DeleteToAPI('/404', token);
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(404);
            expect(error.message).toBe('Data not found');
        }
    });
});
