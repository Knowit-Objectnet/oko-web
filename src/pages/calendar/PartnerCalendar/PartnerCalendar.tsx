import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { ExpandableAgenda } from './ExpandableAgenda';
import { ApiEvent, apiUrl, EventInfo } from '../../../types';
import add from 'date-fns/add';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';

const Wrapper = styled.div``;

interface PartnerCalendarProps {
    date: Date;
    isToggled: boolean;
    onSelectEvent: (start: Date, end: Date, title: string) => void;
    onWeekChange: (delta: -1 | 1) => void;
}

export const PartnerCalendar: React.FC<PartnerCalendarProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    // Function that handles an event click in the calendar. It displays the Event in a modal
    const onSelectEvent = (event: EventInfo) => {
        props.onSelectEvent(event.start, event.end, event.title);
    };

    // Events fetched from api
    const { data: apiEvents } = useSWR<ApiEvent[]>([`${apiUrl}/calendar/events/`, keycloak.token], fetcher);
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
