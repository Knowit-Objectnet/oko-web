import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';

import { PatchToAPI } from '../../src/utils/PatchToAPI';

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
                return { status: 200 };
            }
            return { status: 200, body: '' };
        });

        try {
            await PatchToAPI(apiUrl, data, token);
        } catch (err) {
            console.log(err);
            fail('PATCH failed');
        }
    });
});
