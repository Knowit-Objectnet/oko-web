import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Notifications } from './Notifications';
import { ChangeLog } from './ChangeLog';
import { Modal } from '../../sharedComponents/Modal';
import { Event } from './Event';
import { NewEvent } from './NewEvent';
import { ExtraEvent } from './ExtraEvent';
import { EventInfo, SlotInfo } from '../../types';
import { useGetCalendarEvents } from '../../hooks/useGetCalendarEvents';
import { useGetNotifications } from '../../hooks/useGetNotifications';
import { useGetChangeLog } from '../../hooks/useGetChangeLog';

const localizer = momentLocalizer(moment);

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
`;

const Module = styled.div`
    display: flex;
    flex-direction: column;
`;

const ModuleCalendar = styled(Module)`
    flex: 1;
    overflow: auto;
`;

const CalendarWrapper = styled.div`
    overflow: auto;
`;

export const CalendarPage: React.FC<null> = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

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
    const dummyNotifications = ['Notification'];
    const dummyChanges = ['A change was made'];

    let events = useGetCalendarEvents();
    events = events.length !== 0 ? events : dummyEvents;

    let notifications = useGetNotifications();
    notifications = notifications.length !== 0 ? notifications : dummyNotifications;

    let changes = useGetChangeLog();
    changes = changes.length !== 0 ? changes : dummyChanges;

    // eslint-disable-next-line
    const onSelectEvent = (event: Object, e: React.SyntheticEvent) => {
        const eventProps: EventInfo = event as EventInfo;
        setModalContent(<Event {...eventProps} />);
        setShowModal(true);
    };

    const onSelectSlot = (slotInfo: SlotInfo) => {
        setModalContent(
            <ExtraEvent
                start={new Date(slotInfo.start)}
                end={new Date(slotInfo.end)}
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
            <Wrapper>
                <Module>
                    <h3>Varslinger</h3>
                    <Notifications notifications={notifications} />
                </Module>
                <ModuleCalendar>
                    <h3>Kalender</h3>
                    <CalendarWrapper>
                        <Calendar
                            localizer={localizer}
                            toolbar={false}
                            views={['month', 'work_week', 'day', 'agenda']}
                            defaultView="work_week"
                            selectable={true}
                            step={15}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            onSelectEvent={onSelectEvent}
                            onSelectSlot={onSelectSlot}
                        />
                    </CalendarWrapper>
                </ModuleCalendar>
                <Module>
                    <h3>Endringslogg</h3>
                    <ChangeLog changes={changes} />
                </Module>
            </Wrapper>
        </>
    );
};
