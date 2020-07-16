import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { ApiEvent, apiUrl, EventInfo } from '../../../types';
import add from 'date-fns/add';
import { ExpandableAgenda } from '../AmbassadorCalendar/ExpandableAgenda';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { Loading } from '../../loading/Loading';

const Wrapper = styled.div``;

interface AmbassadorCalendarProps {
    date: Date;
    isToggled: boolean;
    onSelectEvent: (start: Date, end: Date, title: string) => void;
    onWeekChange: (delta: -1 | 1) => void;
}

/*
 * Calendar and Agenda for station ambassadors
 */
export const AmbassadorCalendar: React.FC<AmbassadorCalendarProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    // Function that handles an event click in the calendar. It displays the Event in a modal
    const onSelectEvent = (event: EventInfo) => {
        props.onSelectEvent(event.start, event.end, event.title);
    };

    // from and to date for event fetching
    // The from date is the last monday from props.date and the to date is 1 week into the future
    // This is such that the week-calendar always has it's 5 days of events
    const fromDate = add(props.date, { days: props.date.getDay() === 0 ? -6 : -props.date.getDay() + 1 });
    fromDate.setHours(7, 0, 0, 0);
    const toDate = add(props.date, { weeks: 1 });
    toDate.setHours(20, 0, 0, 0);

    // Events fetched from the api
    // Contains parameters to only get events in date range specified above and only from the accounts
    // station location
    const { data: apiEvents, isValidating } = useSWR<ApiEvent[]>(
        [
            `${apiUrl}/calendar/events/?from-date=${fromDate.toISOString()}&to-date=${toDate.toISOString()}&station-id=${
                keycloak.tokenParsed.GroupID
            }`,
            keycloak.token,
        ],
        fetcher,
    );
    const events: EventInfo[] = apiEvents
        ? apiEvents.map((event: ApiEvent) => {
              const newEvent: EventInfo = {
                  start: new Date(event.startDateTime),
                  end: new Date(event.endDateTime),
                  title: event.partner.name,
                  allDay: false,
                  resource: {
                      location: event.station,
                  },
              };
              return newEvent;
          })
        : [];

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
            />
        </Wrapper>
    );
};
