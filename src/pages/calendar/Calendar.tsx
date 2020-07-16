import * as React from 'react';
import styled from 'styled-components';
import { default as DateCalendar } from 'react-calendar';
import { RegCalendar } from './RegCalendar/RegCalendar';
import { useState } from 'react';
import { Modal } from '../../sharedComponents/Modal';
import { Event } from './events/Event';
import { ExtraEvent } from './events/ExtraEvent';
import { NewEvent } from './events/NewEvent';
import { SideMenu } from './SideMenu';
import { EventInfo, Roles } from '../../types';
import keycloak from '../../keycloak';
import { PartnerCalendar } from './PartnerCalendar/PartnerCalendar';
import { AmbassadorCalendar } from './AmbassadorCalendar/AmbassadorCalendar';
import add from 'date-fns/add';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 40px;
    box-sizing: border-box;

    @media screen and (max-width: 900px) {
        flex-direction: column;
        overflow: auto;
    }
`;

const Module = styled.div`
    display: flex;
    flex-direction: column;
`;

const ModuleDateCalendar = styled.div`
    margin-right: 20px;

    & > .react-calendar {
        border: none;
    }

    @media screen and (max-width: 900px) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }
`;

const ModuleCalendar = styled(Module)`
    flex: 1;

    @media screen and (min-width: 900px) {
        overflow: auto;
    }
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
    margin-left: 40px;
    justify-content: flex-start;
    align-items: flex-start;

    @media screen and (max-width: 900px) {
        position: absolute;
        top: 10px;
        left: 10px;
        margin-left: 0;
    }
`;

/**
 * The page component for the calendar view
 */
export const CalendarPage: React.FC = () => {
    // State for handling modal
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
    // State for day handling
    const [selectedDate, setSelectedDate] = useState(new Date());
    // State for side menu
    const [isToggled, setIsToggled] = useState(false);

    // on date change function for the react date selector
    const onDateChange = (date: Date | Date[]) => {
        if (date instanceof Date) {
            setSelectedDate(date);
        }
    };

    // Function to get start and end times/dates for new events
    const getStartAndEnd = () => {
        // Date object for creating other date objects
        const date = new Date();
        // Date object for getting time and date now
        const now = new Date();

        // Max and min of opening time range
        const min = new Date(date.setHours(7, 0));
        const max = new Date(date.setHours(20, 0));

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
            // If the time now is less than one hour behind max then set end to max
        } else if (now.getHours() === max.getHours() - 1) {
            end = max;
            // If the time now is more than the allowed maximum then set the end to maximum
        } else if (now > max) {
            start = min;
            end = max;
        }

        return { start, end };
    };

    // New event display function
    const newEvent = () => {
        const { start, end } = getStartAndEnd();
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

    // Extra event display function
    const extraEvent = () => {
        const { start, end } = getStartAndEnd();
        setModalContent(
            <ExtraEvent
                start={start}
                end={end}
                onFinished={() => {
                    setShowModal(false);
                }}
            />,
        );
        setShowModal(true);
    };

    // On event selection function to display an event
    const onSelectEvent = (event: EventInfo) => {
        setModalContent(<Event {...event} />);
        setShowModal(true);
    };

    // On slot selection function to display new or extra event
    const onSelectSlot = (start: Date, end: Date, isOslo: boolean) => {
        const EventComponent = isOslo ? NewEvent : ExtraEvent;

        setModalContent(
            <EventComponent
                start={start}
                end={end}
                onFinished={() => {
                    setShowModal(false);
                }}
            />,
        );
        setShowModal(true);
    };

    // Click function for agenda/calendar toggle button
    const toggleCalendarClick = () => {
        setIsToggled(!isToggled);
    };

    // On week change selector function
    const onWeekChange = (delta: -1 | 1) => {
        const dayOfDeltaWeek = add(selectedDate, { weeks: delta });
        setSelectedDate(dayOfDeltaWeek);
    };

    // Function to decide which calendar to render depending on role
    const getCalendar = () => {
        if (keycloak.hasRealmRole(Roles.Partner)) {
            return (
                <PartnerCalendar
                    onSelectEvent={onSelectEvent}
                    date={selectedDate}
                    isToggled={isToggled}
                    onWeekChange={onWeekChange}
                />
            );
        } else if (keycloak.hasRealmRole(Roles.Ambassador)) {
            return (
                <AmbassadorCalendar
                    onSelectEvent={onSelectEvent}
                    date={selectedDate}
                    isToggled={isToggled}
                    onWeekChange={onWeekChange}
                />
            );
        }
        return (
            <RegCalendar
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                newEvent={newEvent}
                date={selectedDate}
            />
        );
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
            <Wrapper>
                <ModuleDateCalendar>
                    <DateCalendar locale="nb-NO" value={selectedDate} onChange={onDateChange} />
                </ModuleDateCalendar>
                <ModuleCalendar>{getCalendar()}</ModuleCalendar>
                <Sidebar>
                    <SideMenu
                        onCalendarToggleClick={toggleCalendarClick}
                        onNewEventClick={newEvent}
                        onExtraEventClick={extraEvent}
                    />
                </Sidebar>
            </Wrapper>
        </>
    );
};
