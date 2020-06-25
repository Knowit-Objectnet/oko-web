import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

export const useGetChangeLog: () => Array<string> = () => {
    // Set state for fetch result
    const [changes, setChanges] = useState([]);
    // Extract keycloak instance for token
    const { keycloak } = useKeycloak();

    useEffect(() => {
        // Wrapper function to allow for async/await
        const init = async () => {
            // Api location, will probably get changed in the future
            const apiUrl = '/api/log/changes';

            const response = await fetch(apiUrl, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${keycloak.token}`,
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            });

            // If response is OK then extract result and update the state if it's not null
            if (response.ok && response.status === 200) {
                const _changes = await response.json();
                if (_changes) {
                    return setChanges(_changes);
                }
            }

            // Throw appropriate error if fetch was not successful
            if (response.status === 500) {
                throw new Error('Internal Server Error');
            } else if (response.status === 401 || response.status === 403) {
                throw new Error('Invalid token');
            } else {
                throw new Error('Unexpected error');
            }
        };
        init();
    }, []);

    // The return value will either be the result of the fetch (if not null) or an empty array
    return changes;
};
