import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Plus } from '@styled-icons/boxicons-regular/Plus';
import { Calendar, Culture, DateFormatFunction, DateLocalizer, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { WeekCalendarLocationPicker } from './WeekCalendarLocationPicker';
import { EventInfo, Roles, SlotInfo } from '../../types';
import { Event } from './Event';
import { NewEvent } from './NewEvent';
import { ExtraEvent } from './ExtraEvent';
import { Modal } from '../../sharedComponents/Modal';
import { useGetCalendarEvents } from '../../hooks/useGetCalendarEvents';
import moment from 'moment';
import { useGetLocations } from '../../hooks/useGetLocations';
import { useKeycloak } from '@react-keycloak/web';

const OverflowWrapper = styled.div`
    overflow: auto;
    flex: 1;
`;

const CalendarWrapper = styled.div`
    overflow: auto;
    display: flex;
    flex-direction: row;
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
    let locations = useGetLocations();
    locations = locations.length === 0 ? ['grønmo', 'haraldrud', 'smestad'] : locations;

    // State
    const [checkedLocation, setCheckedLocation] = useState(locations[0]);

    // On change for Location
    const onLocationChange = (location: string) => {
        setCheckedLocation(location);
    };

    // Events fetched from api
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    const dummyEvents: Array<EventInfo> = [
        {
            title: 'Test',
            start: new Date(new Date().setHours(10)),
            end: new Date(new Date().setHours(12)),
            allDay: false,
            resource: {
                location: 'grønmo',
                driver: 'odd',
                weight: 100,
                message: {
                    start: new Date(),
                    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                    text: 'Tar ikke i mot barneleker ifm. Covid-19 tiltak.',
                },
            },
        },
        {
            title: 'Test',
            start: new Date(new Date().setHours(16)),
            end: new Date(new Date().setHours(20)),
            allDay: false,
            resource: {
                location: 'grønmo',
            },
        },
    ];
    let events = useGetCalendarEvents(checkedLocation);
    events = events.length !== 0 ? events : dummyEvents;

    // Localizer needed for the calendar
    const localizer = momentLocalizer(moment);

    // Function for changing timeslot from 12 hour clock to 24 hour clock.
    const timeFormatfunction: DateFormatFunction = (
        date: Date,
        culture?: Culture,
        localizer?: DateLocalizer,
    ): string => {
        let formatString = '';
        if (localizer) {
            formatString = culture ? localizer.format(date, 'HH:mm', culture) : localizer.format(date, 'HH:mm', 'nb');
        }
        return formatString;
    };
    const formats = {
        timeGutterFormat: timeFormatfunction,
    };

    // Function that handles an event click in the calendar. It displays the Event in a modal
    // eslint-disable-next-line
    const onSelectEvent = (event: Object, e: React.SyntheticEvent) => {
        const eventProps: EventInfo = event as EventInfo;
        setModalContent(<Event {...eventProps} />);
        setShowModal(true);
    };

    // Function that handles time range selection in the calendar
    // It displays either a new event, or extra event depending on user role.
    // TODO: Make it show component depending on user role
    const onSelectSlot = (slotInfo: SlotInfo) => {
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
    const onNewEventButtonClick = (e: React.SyntheticEvent) => {
        setModalContent(
            <NewEvent
                start={new Date()}
                end={new Date(new Date().setHours(1))}
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
                        localizer={localizer}
                        culture="nb"
                        formats={formats}
                        toolbar={false}
                        views={['month', 'work_week', 'day', 'agenda']}
                        defaultView="work_week"
                        selectable={keycloak.authenticated}
                        step={15}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        onSelectEvent={onSelectEvent}
                        onSelectSlot={onSelectSlot}
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
