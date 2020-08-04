import { cache } from 'swr';
import { apiUrl } from './types';
import { fetcher } from './utils/fetcher';

// function to pre-fetch data for a better user experience
export const preFetch: (token?: string) => void = async (token?: string) => {
    // List if urls to prefetch from
    const list: Array<[string, boolean]> = [
        [`${apiUrl}/partners`, false],
        [`${apiUrl}/stations`, false],
    ];

    // Loop through all urls
    for (const url of list) {
        // Clean key without token
        const cleanKey = url[0];

        // Key for swr (with or without token)
        let key = cleanKey;
        // If the user is logged and the url needs auth then in set the token into the key
        if (token && url[1]) {
            // If the data has been cached from earlier
            key = `arg@"` + key + `"@"${token}"`;
        }

        // Get the cached data
        let cachedData = localStorage.getItem(key);

        if (cachedData) {
            // parse data
            cachedData = JSON.parse(cachedData);
            // Update the swr-cache
            cache.set(key, cachedData, true);
        } else {
            // If the data doesnt exist then get it and update the swr-cache
            const res = await fetcher(url[0], token);
            cache.set(key, res, true);
        }

        // Try to update the cache to not end up with very outdated data
        try {
            const res = await fetcher(url[0], '');
            // stringify and save data
            localStorage.setItem(cleanKey, JSON.stringify(res));
        } catch {
            // If we fail to fetch data then remove the cached data as it probably either means the data doesnt exist
            // Or that we dont have access to it anymore without being logged in
            localStorage.removeItem(cleanKey);
        }
    }
};
