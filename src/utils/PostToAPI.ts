export async function PostToAPI(url: string, data: Record<string, unknown>, token: string): Promise<any> {
    const response = await fetch(url, {
        method: 'POST',
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
        return await response.json();
    }

    // Throw appropriate error if the post was not successful
    if (response.status === 500) {
        throw new Error('Internal Server Error');
    } else if (response.status === 401 || response.status === 403) {
        throw new Error('Invalid token');
    } else {
        throw new Error('Unexpected error');
    }
}
