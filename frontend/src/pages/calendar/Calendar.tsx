import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal } from '../../sharedComponents/Modal';
import { Event } from './Event';
import { NewEvent } from './NewEvent';
import { ExtraEvent } from './ExtraEvent';
import { EventInfo, SlotInfo } from '../../types';
import { useGetCalendarEvents } from '../../hooks/useGetCalendarEvents';

const localizer = momentLocalizer(moment);

const Wrapper = styled.div`
    height: 50%;
    width: 100%;
`;

export const CalendarPage: React.FC<null> = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    const dummyData: Array<EventInfo> = [
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
    let events = useGetCalendarEvents();
    events = events.length !== 0 ? events : dummyData;

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
                <Calendar
                    localizer={localizer}
                    defaultView="week"
                    selectable={true}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={onSelectEvent}
                    onSelectSlot={onSelectSlot}
                />
            </Wrapper>
        </>
    );
};
