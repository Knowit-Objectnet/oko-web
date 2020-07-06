import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';

import { PostToAPI } from '../../src/utils/PostToAPi';

global.fetch = fetch;

describe('Provides utility functions', () => {
    it('Should allow data to be POSTed to API', async () => {
        const apiUrl = '/test';

        const data = {
            info: 'FakeInfo',
        };

        const token = 'fakeToken';

        fetch.mockResponse(async (req) => {
            if (req.url == apiUrl) {
                const json = await req.json();
                return JSON.stringify(json);
            }
            return '';
        });

        try {
            const res = await PostToAPI(apiUrl, data, token);
            expect(res).toStrictEqual(data);
        } catch (err) {
            console.log(err);
            fail('POST failed');
        }
    });
});
