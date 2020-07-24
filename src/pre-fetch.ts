import { cache } from 'swr';
import { apiUrl } from './types';
import { fetcher } from './utils/fetcher';

export const preFetch = async (token?: string) => {
    const list = [`${apiUrl}/partner/partners/`];

    for (const url of list) {
        const cachedData = localStorage.getItem(`arg@"${url}"`);

        if (token) {
            if (cachedData) {
                cache.set(`arg@"${url}"@${token}`, cachedData, true);
            } else {
                const res = await fetcher(url, token);
                cache.set(`arg@"${url}"@${token}`, res, true);
            }
        } else {
            try {
                const res = await fetcher(url, '');
                localStorage.setItem(`arg@"${url}"`, res);
            } catch {
                localStorage.removeItem(`arg@"${url}"`);
            }
        }
    }
};
