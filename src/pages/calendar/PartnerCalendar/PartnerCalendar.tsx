import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { ExpandableAgenda } from './ExpandableAgenda';
import { ApiEvent, apiUrl, EventInfo } from '../../../types';
import add from 'date-fns/add';
import useSWR, {mutate} from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { Loading } from '../../loading/Loading';
import {DeleteToAPI} from "../../../utils/DeleteToAPI";

const Wrapper = styled.div``;

interface PartnerCalendarProps {
    date: Date;
    isToggled: boolean;
    onSelectEvent: (Event: EventInfo) => void;
    onWeekChange: (delta: -1 | 1) => void;
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

    // from and to date for event fetching
    // The from date is the last monday from props.date and the to date is 1 week into the future
    // This is such that the week-calendar always has it's 5 days of events
    const fromDate = add(props.date, { days: props.date.getDay() === 0 ? -6 : -props.date.getDay() + 1 });
    fromDate.setHours(7, 0, 0, 0);
    const toDate = add(props.date, { weeks: 1 });
    toDate.setHours(20, 0, 0, 0);

    // Api url
    const url = `${apiUrl}/calendar/events/?from-date=${fromDate.toISOString()}&to-date=${toDate.toISOString()}&partner-id=${
        keycloak.tokenParsed.GroupID
    }`;

    // Events fetched from the api
    // Contains parameters to only get events in date range specified above and only from the accounts
    // station location
    const { data: apiEvents, isValidating } = useSWR<ApiEvent[]>([url, keycloak.token], fetcher);
    const events: EventInfo[] = apiEvents
        ? apiEvents.map((event: ApiEvent) => {
              const newEvent: EventInfo = {
                  start: new Date(event.startDateTime),
                  end: new Date(event.endDateTime),
                  title: event.partner.name,
                  resource: {
                      eventId: event.id,
                      partner: event.partner,
                      location: event.station,
                      recurrenceRule: event.recurrenceRule,
                  },
              };
              return newEvent;
          })
        : [];

    const deleteEvent = async (event: EventInfo) => {
        if (apiEvents) {
            // update the local data immediately, but disable the revalidation
            const newEvents = apiEvents.filter((apiEvent) => apiEvent.id !== event.resource.eventId);
            console.log(newEvents)
            console.log(event)
            mutate([url, keycloak.token], newEvents, false);

            // send a request to the API to update the source
            await DeleteToAPI(`${apiUrl}/calendar/events/?event-id=${event.resource.eventId}`, keycloak.token);

            // trigger a revalidation (refetch) to make sure our local data is correct
            mutate([url, keycloak.token]);
        }
    };

    // If swr is validating (a fetch is loading) and there are no events then show load component
    // As that means it is the first time its fetching data. This allows us to still
    // get the snappy feeling from the stale data while it's validating in the background
    if ((!events || events.length <= 0) && isValidating) {
        return <Loading text="Laster inn data..." />;
    }

    return (
        <Wrapper>
            <ExpandableAgenda
                date={props.date}
                isToggled={props.isToggled}
                onSelectEvent={onSelectEvent}
                events={events}
                onWeekChange={props.onWeekChange}
                deleteEvent={deleteEvent}
            />
        </Wrapper>
    );
};
