import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { EventInfo } from '../types';

export const useGetCalendarEvents: (location: string) => Array<EventInfo> = (location: string) => {
    const [events, setEvents] = useState([]);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        const init = async () => {
            const apiUrl = `/api/calendar/events/${location}`;

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
                const _events = await response.json();
                if (!_events) {
                    return setEvents(_events);
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
    }, [location]);

    return events;
};
