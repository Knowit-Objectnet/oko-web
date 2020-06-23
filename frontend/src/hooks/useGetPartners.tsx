import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

export const useGetPartners: () => Array<string> = () => {
    const [partners, setPartners] = useState([]);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        const init = async () => {
            const apiUrl = '/api/partners';

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
                const _partners = await response.json();
                if (!_partners) {
                    return setPartners(_partners);
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

    return partners;
};
