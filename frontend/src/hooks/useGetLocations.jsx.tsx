import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

export const useGetLocations: () => Array<string> = () => {
    const [locations, setLocations] = useState([]);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        const init = async () => {
            const apiUrl = '/api/locations';

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

            if (response.ok && response.status === 200) {
                const _locations = await response.json();
                if (!_locations) {
                    return setLocations(_locations);
                }
            }

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

    return locations;
};
