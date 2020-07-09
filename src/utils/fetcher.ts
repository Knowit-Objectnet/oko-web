export async function fetcher(url: string, token: string): Promise<any> {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });

    // If response is OK then extract result and update the state if it's not null
    if (response.ok && response.status === 200) {
        return response.json();
    }

    // Throw appropriate error if fetch was not successful
    if (response.status === 500) {
        throw new Error('Internal Server Error');
    } else if (response.status === 401 || response.status === 403) {
        throw new Error('Invalid token');
    } else {
        throw new Error('Unexpected error');
    }
}
