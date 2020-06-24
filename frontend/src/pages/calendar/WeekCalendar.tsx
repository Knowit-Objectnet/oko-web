import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventInfo, SlotInfo } from '../../types';
import { Event } from './Event';
import { NewEvent } from './NewEvent';
import { ExtraEvent } from './ExtraEvent';
import { Modal } from '../../sharedComponents/Modal';
import { useGetCalendarEvents } from '../../hooks/useGetCalendarEvents';
import moment from 'moment';

const CalendarWrapper = styled.div`
    overflow: auto;
`;

export const WeekCalendar: React.FC<unknown> = (props) => {
    const localizer = momentLocalizer(moment);

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
    let events = useGetCalendarEvents();
    events = events.length !== 0 ? events : dummyEvents;

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
        </>
    );
};
