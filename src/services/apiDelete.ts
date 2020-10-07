import { FetchError } from '../utils/FetchError';

export async function apiDelete(url: string, token: string): Promise<string> {
    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });

    // If response is OK then return result
    if (response.ok && response.status === 200) {
        return await new Promise((resolve) => resolve('Deletion successful'));
    }

    // Throw appropriate error if the post was not successful
    if (response.status === 500) {
        throw new FetchError('Internal Server Error', 500);
    } else if (response.status === 401) {
        throw new FetchError('Invalid token', 401);
    } else if (response.status === 403) {
        throw new FetchError('Forbidden, insufficient permissions', 403);
    } else if (response.status === 404) {
        throw new FetchError('Data not found', 404);
    } else {
        throw new Error('Unexpected error');
    }
}
