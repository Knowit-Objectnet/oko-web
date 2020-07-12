import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Plus } from '@styled-icons/boxicons-regular/Plus';
import { WeekCalendarLocationPicker } from './WeekCalendarLocationPicker';
import { ApiEvent, EventInfo, Roles, SlotInfo, apiUrl } from '../../types';
import { Event } from './events/Event';
import { NewEvent } from './events/NewEvent';
import { ExtraEvent } from './events/ExtraEvent';
import { Modal } from '../../sharedComponents/Modal';
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

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
    margin-left: 20px;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
`;

/**
 * Component that handles the actualy calendar component from React Big Calendar
 */
export const WeekCalendar: React.FC = () => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    // State for handling modal
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    // Valid recycling stations (ombruksstasjon) locations fetched from api
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    let { data: locations } = useSWR<string[]>(['/api/locations', keycloak.token], fetcher);
    locations = locations && locations.length !== 0 ? locations : ['grønmo', 'haraldrud', 'smestad'];

    // State
    const [checkedLocation, setCheckedLocation] = useState(locations[0]);

    // On change for Location
    const onLocationChange = (location: string) => {
        setCheckedLocation(location);
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

    // Function that handles an event click in the calendar. It displays the Event in a modal
    const onSelectEvent = (event: EventInfo) => {
        setModalContent(<Event {...event} />);
        setShowModal(true);
    };

    // Function that handles time range selection in the calendar
    // It displays either a new event, or extra event depending on user role.
    // TODO: Make it show component depending on user role
    const onSelectSlot = (slotInfo: SlotInfo) => {
        // Set modal component depending on role
        const EventComponent = keycloak.hasRealmRole(Roles.Oslo) ? NewEvent : ExtraEvent;

        setModalContent(
            <EventComponent
                start={new Date(slotInfo.start)}
                end={new Date(slotInfo.end)}
                onFinished={() => {
                    setShowModal(false);
                }}
            />,
        );
        setShowModal(true);
    };

    // Function to display new event in modal on new event button click
    const onNewEventButtonClick = () => {
        // Date object for creating other date objects
        const date = new Date();
        // Date object for getting time and date now
        const now = new Date();

        // Max and min of opening time range
        const min = new Date(date.setHours(7, 30));
        const max = new Date(date.setHours(21, 0));

        // Round up to the closest quarter of an hour
        const startMinutes = (Math.ceil((now.getMinutes() + 1) / 15) * 15) % 60;
        // Round to the correct hour depending on the rounding of minutes
        const startHours = (((startMinutes / 105 + 0.5) | 0) + now.getHours()) % 24;
        // Set the start and date range for new event
        let start = new Date(date.setHours(startHours, startMinutes));
        let end = new Date(date.setHours(startHours + 1, startMinutes));

        // if the time now is less than the allowed minimum then set the start to minimum
        if (now < min) {
            start = min;
            // If the time now is more than the allowed maximum then set the end to maximum
        } else if (now > max) {
            min.setDate(min.getDate() + 1);
            start = min;
            // If the time now is less than one hour behind max then set end to max
        } else if (now.getHours() === max.getHours() - 1) {
            end = max;
        }

        setModalContent(
            <NewEvent
                start={start}
                end={end}
                onFinished={() => {
                    setShowModal(false);
                }}
            />,
        );
        setShowModal(true);
    };

    const day1 = new Date();
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
            {showModal ? (
                <Modal
                    exitModalCallback={() => {
                        setShowModal(false);
                    }}
                    content={modalContent}
                />
            ) : null}
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
                {keycloak.hasRealmRole(Roles.Oslo) ? (
                    <Sidebar>
                        <WeekCalendarLocationPicker
                            locations={locations}
                            checkedLocation={checkedLocation}
                            onChange={onLocationChange}
                        />
                        <Button onClick={onNewEventButtonClick}>
                            <Plus size="1em" />
                            Legg til avtale
                        </Button>
                    </Sidebar>
                ) : null}
            </CalendarWrapper>
        </>
    );
};
