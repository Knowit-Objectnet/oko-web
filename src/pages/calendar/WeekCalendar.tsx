import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Plus } from '@styled-icons/boxicons-regular/Plus';
import { Calendar } from '../../sharedComponents/Calendar/Calendar';
import { WeekCalendarLocationPicker } from './WeekCalendarLocationPicker';
import { ApiEvent, EventInfo, Roles, SlotInfo, apiUrl } from '../../types';
import { Event } from './Event';
import { NewEvent } from './NewEvent';
import { ExtraEvent } from './ExtraEvent';
import { Modal } from '../../sharedComponents/Modal';
import moment from 'moment';
import { useKeycloak } from '@react-keycloak/web';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

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

    /*
    const onSelecting = (range: { start: stringOrDate; end: stringOrDate }) => {
        const startDate = new Date(range.start);

        // If the startDate-time of the select is less than now then disable select
        if (startDate < new Date()) {
            return false;
        } else {
            return true;
        }
    };*/

    // Function that handles an event click in the calendar. It displays the Event in a modal
    const onSelectEvent = (event: EventInfo) => {
        const eventProps: EventInfo = event as EventInfo;
        setModalContent(<Event {...eventProps} />);
        setShowModal(true);
    };

    // Function that handles time range selection in the calendar
    // It displays either a new event, or extra event depending on user role.
    // TODO: Make it show component depending on user role
    const onSelectSlot = (slotInfo: SlotInfo) => {
        // Turn the slotInfo dateString to a Date
        const startDate = new Date(slotInfo.start);
        // If the start date is less than now then don't show the popup modal
        if (startDate < new Date()) {
            return;
        }

        // Create max and min times on the slotInfo date
        const minTime = new Date(startDate.setHours(7, 30));
        const maxTime = new Date(startDate.setHours(21, 0));

        // If the start is less than the allowed minimum then set the start to minimum
        if (slotInfo.start < minTime) {
            slotInfo.start = minTime;
            // If the start is more than the allowed maximum then set the start to maximum
        } else if (slotInfo.start > maxTime) {
            slotInfo.start = maxTime;
        }
        // If the end is less than the start time then set it to the start time
        if (slotInfo.end < slotInfo.start) {
            slotInfo.end = slotInfo.start;
            // If the end is more than the allowed maximum then set the end to maximum
        } else if (slotInfo.end > maxTime) {
            slotInfo.end = maxTime;
        }

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

    const onSelecting = (range: { start?: Date; end?: Date }) => {
        // If the startDate-time of the select is less than now then disable select
        if (!range.start || range.start < new Date()) {
            return false;
        } else {
            return true;
        }
    };

    // Function to display new event in modal on new event button click
    const onNewEventButtonClick = (e: React.SyntheticEvent) => {
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
                    <Calendar
                        columns={['Haralrud', 'Smestad', 'Grønmo', 'Grefsen', 'Ryen']}
                        onSelectSlot={onSelectSlot}
                        onSelecting={onSelecting}
                        onSelectEvent={onSelectEvent}
                        selectable={keycloak.authenticated}
                        step={15}
                        min={new Date(new Date().setHours(7, 0, 0, 0))}
                        max={new Date(new Date().setHours(20, 0, 0, 0))}
                    />
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
