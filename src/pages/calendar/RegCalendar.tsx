import * as React from 'react';
import styled from 'styled-components';
import { ApiEvent, EventInfo, Roles, SlotInfo, apiUrl } from '../../types';
import { useKeycloak } from '@react-keycloak/web';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { ExpandableAgenda } from '../../sharedComponents/ExpandableAgenda';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';

const OverflowWrapper = styled.div`
    overflow: auto;
    flex: 1;
`;

/*
 * IMPORTANT: To remove the all-day slots we've overwritten the css from the calendar.
 * However, this css might change in future versions of the calendar and break the fix,
 * so be sure to check it after the calendar version has been updated!
 */
const CalendarWrapper = styled.div`
    overflow: auto;
    display: flex;
    flex-direction: row;

    & .rbc-allday-cell {
        display: none !important;
    }

    & .rbc-header {
        border-bottom: none;
    }
`;

const AgendaWrapper = styled.div`
    &:not(last-child) {
        margin-bottom: 20px;
    }
`;

interface WeekCalendarProps {
    date: Date;
    newEvent: (start: Date, end: Date) => void;
    onSelectEvent: (start: Date, end: Date, title: string) => void;
    onSelectSlot: (start: Date, end: Date, isOslo: boolean) => void;
}

/**
 * Component that handles the actualy calendar component from React Big Calendar
 */
export const RegCalendar: React.FC<WeekCalendarProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    // Events fetched from api
    const { data: apiEvents } = useSWR<ApiEvent[]>([`${apiUrl}/events/`, keycloak.token], fetcher);
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

    // Function that handles an event click in the calendar. It displays the Event in a modal
    const onSelectEvent = (event: EventInfo) => {
        props.onSelectEvent(event.start, event.end, event.title);
    };

    // Function that handles time range selection in the calendar
    // It displays either a new event, or extra event depending on user role.
    // TODO: Make it show component depending on user role
    const onSelectSlot = (slotInfo: SlotInfo) => {
        props.onSelectSlot(slotInfo.start, slotInfo.end, keycloak.hasRealmRole(Roles.Oslo));
    };

    const day1 = props.date;
    const day2 = addDays(day1, 1);
    const day3 = addDays(day1, 2);
    const day4 = addDays(day1, 3);
    const day5 = addDays(day1, 4);

    const day1Events = events.filter((event) => isSameDay(event.start, day1));
    const day2Events = events.filter((event) => isSameDay(event.start, day2));
    const day3Events = events.filter((event) => isSameDay(event.start, day3));
    const day4Events = events.filter((event) => isSameDay(event.start, day4));
    const day5Events = events.filter((event) => isSameDay(event.start, day5));

    return (
        <>
            <CalendarWrapper>
                <OverflowWrapper>
                    <AgendaWrapper>
                        <ExpandableAgenda
                            date={day1}
                            columns={['Haralrud', 'Smestad', 'Grønmo', 'Grefsen', 'Ryen']}
                            events={[day1Events]}
                            onSelectSlot={onSelectSlot}
                            onSelectEvent={onSelectEvent}
                        />
                    </AgendaWrapper>
                    <AgendaWrapper>
                        <ExpandableAgenda
                            date={day2}
                            columns={['Haralrud', 'Smestad', 'Grønmo', 'Grefsen', 'Ryen']}
                            events={[day2Events]}
                            onSelectSlot={onSelectSlot}
                            onSelectEvent={onSelectEvent}
                        />
                    </AgendaWrapper>
                    <AgendaWrapper>
                        <ExpandableAgenda
                            date={day3}
                            columns={['Haralrud', 'Smestad', 'Grønmo', 'Grefsen', 'Ryen']}
                            events={[day3Events]}
                            onSelectSlot={onSelectSlot}
                            onSelectEvent={onSelectEvent}
                        />
                    </AgendaWrapper>
                    <AgendaWrapper>
                        <ExpandableAgenda
                            date={day4}
                            columns={['Haralrud', 'Smestad', 'Grønmo', 'Grefsen', 'Ryen']}
                            events={[day4Events]}
                            onSelectSlot={onSelectSlot}
                            onSelectEvent={onSelectEvent}
                        />
                    </AgendaWrapper>
                    <AgendaWrapper>
                        <ExpandableAgenda
                            date={day5}
                            columns={['Haralrud', 'Smestad', 'Grønmo', 'Grefsen', 'Ryen']}
                            events={[day5Events]}
                            onSelectSlot={onSelectSlot}
                            onSelectEvent={onSelectEvent}
                        />
                    </AgendaWrapper>
                </OverflowWrapper>
            </CalendarWrapper>
        </>
    );
};
