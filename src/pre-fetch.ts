import { cache } from 'swr';
import { apiUrl } from './types';
import { fetcher } from './utils/fetcher';

// function to pre-fetch data for a better user experience
export const preFetch = async (token?: string) => {
    // List if urls to prefetch from
    const list = [`${apiUrl}/partners/`, `${apiUrl}/stations/`];

    // Loop through all urls
    for (const url of list) {
        // Get the cached data
        let cachedData = localStorage.getItem(`arg@"${url}"`);

        // If the user is logged in
        if (token) {
            // If the data has been cached from earlier
            if (cachedData) {
                // parse data
                cachedData = JSON.parse(cachedData);
                // Update the swr-cache
                cache.set(`arg@"${url}"@"${token}"`, cachedData, true);
            } else {
                // If the data doesnt exist then get it and update the swr-cache
                const res = await fetcher(url, token);
                cache.set(`arg@"${url}"@"${token}"`, res, true);
            }
        }

        // Try to update the cache to not end up with very outdated data
        try {
            const res = await fetcher(url, '');
            // stringify and save data
            localStorage.setItem(`arg@"${url}"`, JSON.stringify(res));
        } catch {
            // If we fail to fetch data then remove the cached data as it probably either means the data doesnt exist
            // Or that we dont have access to it anymore without being logged in
            localStorage.removeItem(`arg@"${url}"`);
        }
    }
};
