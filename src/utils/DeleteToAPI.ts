export async function DeleteToAPI(url: string, token: string): Promise<any> {
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
        throw new Error('Internal Server Error');
    } else if (response.status === 401 || response.status === 403) {
        throw new Error('Invalid token');
    } else if (response.status === 404) {
        throw new Error('Event not found');
    } else {
        throw new Error('Unexpected error');
    }
}
