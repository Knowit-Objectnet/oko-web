import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

export const useGetFetchAPI: <T>(apiUrl: string, mapping?: (value: T, index: number, array: T[]) => T) => Array<T> = (
    apiUrl,
    mapping,
) => {
    // Set state for fetch result
    const [elements, setElements] = useState([]);
    // Extract keycloak instance for token
    const { keycloak } = useKeycloak();

    useEffect(() => {
        // Wrapper function to allow for async/await
        const init = async () => {
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
                let _elements = await response.json();
                if (mapping) {
                    _elements = _elements.map(mapping);
                }
                if (_elements) {
                    return setElements(_elements);
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
    return elements;
};
