import { FetchError } from './FetchError';

export async function PatchToAPI(url: string, data: Record<string, unknown>, token: string): Promise<any> {
    const response = await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
    });

    // If response is OK then return result
    if (response.ok && response.status === 200) {
        return await new Promise((resolve) => resolve('Update successful'));
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
