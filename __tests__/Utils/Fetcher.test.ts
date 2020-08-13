import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';

import { fetcher } from '../../src/utils/fetcher';
import { FetchError } from '../../src/utils/FetchError';
import { mockPartners } from '../../__mocks__/mockPartners';

global.fetch = fetch;

describe('Provides utility functions', () => {
    const apiUrl = '/test';

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async ({ url }) => {
            if (url === apiUrl) {
                return { status: 200, body: JSON.stringify(mockPartners) };
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

    it('Should allow data fetching', async () => {
        try {
            const data = await fetcher(apiUrl);
            expect(data).toStrictEqual(mockPartners);
        } catch (err) {
            console.log(err);
            fail('GET/fetch failed');
        }
    });

    it('should throw 500 FetchError on HTTP error 500', async () => {
        try {
            await fetcher('/500');
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(500);
            expect(error.message).toBe('Internal Server Error');
        }
    });

    it('should throw 401 FetchError on HTTP error 401', async () => {
        try {
            await fetcher('/401');
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(401);
            expect(error.message).toBe('Invalid token');
        }
    });

    it('should throw 403 FetchError on HTTP error 403', async () => {
        try {
            await fetcher('/403');
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(403);
            expect(error.message).toBe('Forbidden, insufficient permissions');
        }
    });

    it('should throw 404 FetchError on HTTP error 404', async () => {
        try {
            await fetcher('/404');
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(404);
            expect(error.message).toBe('Data not found');
        }
    });
});
