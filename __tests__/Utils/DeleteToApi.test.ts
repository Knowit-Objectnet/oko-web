import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';

import { DeleteToAPI } from '../../src/utils/DeleteToAPI';

global.fetch = fetch;

describe('Provides utility functions', () => {
    it('Should allow data to be deleted from API', async () => {
        const apiUrl = '/test';

        const token = 'fakeToken';

        fetch.mockResponse(async (req) => {
            if (req.url == apiUrl) {
                return { status: 200 };
            }
            return { status: 200, body: '' };
        });

        try {
            await DeleteToAPI(apiUrl, token);
        } catch (err) {
            console.log(err);
            fail('DELETE failed');
        }
    });
});
