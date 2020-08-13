import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';

import { PostToAPI } from '../../src/utils/PostToAPI';
import { FetchError } from '../../src/utils/FetchError';

global.fetch = fetch;

describe('Provides utility functions', () => {
    const apiUrl = '/test';

    const data = {
        info: 'FakeInfo',
    };

    const token = 'fakeToken';

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(async (req) => {
            const parsedData = await req.json();
            if (req.url === apiUrl) {
                return { status: 200, body: JSON.stringify(parsedData) };
            } else if (req.url === '/500') {
                return { status: 500 };
            } else if (req.url === '/401') {
                return { status: 401 };
            } else if (req.url === '/403') {
                return { status: 403 };
            } else if (req.url === '/409') {
                return { status: 409 };
            }
            return { status: 404, body: '' };
        });
    });

    it('Should allow data to be POSTed to API', async () => {
        try {
            const res = await PostToAPI(apiUrl, data, token);
            expect(res).toStrictEqual(data);
        } catch (err) {
            console.log(err);
            fail('POST failed');
        }
    });

    it('should throw 500 FetchError on HTTP error 500', async () => {
        try {
            await PostToAPI('/500', data, token);
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(500);
            expect(error.message).toBe('Internal Server Error');
        }
    });

    it('should throw 401 FetchError on HTTP error 401', async () => {
        try {
            await PostToAPI('/401', data, token);
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(401);
            expect(error.message).toBe('Invalid token');
        }
    });

    it('should throw 403 FetchError on HTTP error 403', async () => {
        try {
            await PostToAPI('/403', data, token);
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(403);
            expect(error.message).toBe('Forbidden, insufficient permissions');
        }
    });

    it('should throw 409 FetchError on HTTP error 409', async () => {
        try {
            await PostToAPI('/409', data, token);
        } catch (err) {
            const error = err as FetchError;
            expect(error.code).toBe(409);
            expect(error.message).toBe('Data already exists in the database');
        }
    });
});
