import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { EventInfo } from '../types';

export const useGetCalendarEvents: (location: string) => Array<EventInfo> = (location: string) => {
    // Set state for fetch result
    const [events, setEvents] = useState([]);
    // Extract keycloak instance for token
    const { keycloak } = useKeycloak();

    useEffect(() => {
        // Wrapper function to allow for async/await
        const init = async () => {
            // Api location, will probably get changed in the future
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

            // If response is OK then extract result and update the state if it's not null
            if (response.ok && response.status === 200) {
                const _events = await response.json();
                _events.map((event: EventInfo) => {
                    event.start = new Date(event.start);
                    event.end = new Date(event.end);
                    return event;
                })
                if (_events) {
                    return setEvents(_events);
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
    }, [location]);

    // The return value will either be the result of the fetch (if not null) or an empty array
    return events;
};
