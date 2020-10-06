import * as React from 'react';
import { ExpandableAgenda } from './ExpandableAgenda';
import { apiUrl, EventInfo } from '../../../types';
import { DeleteToAPI } from '../../../utils/DeleteToAPI';
import { useKeycloak } from '@react-keycloak/web';

interface PartnerCalendarProps {
    date: Date;
    isToggled: boolean;
    onSelectEvent: (Event: EventInfo) => void;
    onWeekChange: (delta: -1 | 1) => void;
    events: Array<EventInfo>;
    beforeDeleteSingleEvent?: (key: string, event: EventInfo) => void;
    afterDeleteSingleEvent?: (successful: boolean, key: string) => void;
}

/*
 * Calendar and Agenda for partners
 */
export const PartnerCalendar: React.FC<PartnerCalendarProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Function that handles an event click in the calendar. It displays the Event in a modal
    const onSelectEvent = (event: EventInfo) => {
        props.onSelectEvent(event);
    };

    const deleteEvent = async (event: EventInfo) => {
        try {
            if (props.beforeDeleteSingleEvent) {
                props.beforeDeleteSingleEvent(`${apiUrl}/events?eventId=${event.resource.eventId}`, event);
            }
            // send a request to the API to update the source
            await DeleteToAPI(`${apiUrl}/events?eventId=${event.resource.eventId}`, keycloak.token);

            if (props.afterDeleteSingleEvent) {
                props.afterDeleteSingleEvent(true, `${apiUrl}/events?eventId=${event.resource.eventId}`);
            }
        } catch (err) {
            if (props.afterDeleteSingleEvent) {
                props.afterDeleteSingleEvent(false, `${apiUrl}/events?eventId=${event.resource.eventId}`);
            }
        }
    };

    return (
        <ExpandableAgenda
            date={props.date}
            isToggled={props.isToggled}
            onSelectEvent={onSelectEvent}
            events={props.events}
            onWeekChange={props.onWeekChange}
            deleteEvent={deleteEvent}
        />
    );
};
