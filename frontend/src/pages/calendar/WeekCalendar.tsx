import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Plus } from '@styled-icons/boxicons-regular/Plus';
import { Calendar, Culture, DateFormatFunction, DateLocalizer, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { WeekCalendarLocationPicker } from './WeekCalendarLocationPicker';
import { EventInfo, SlotInfo } from '../../types';
import { Event } from './Event';
import { NewEvent } from './NewEvent';
import { ExtraEvent } from './ExtraEvent';
import { Modal } from '../../sharedComponents/Modal';
import { useGetCalendarEvents } from '../../hooks/useGetCalendarEvents';
import moment from 'moment';
import { useGetLocations } from '../../hooks/useGetLocations.jsx';

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

export const WeekCalendar: React.FC<unknown> = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    let locations = useGetLocations();
    locations = locations.length === 0 ? ['grønmo', 'haraldrud', 'smedstad'] : locations;

    const [checkedLocation, setCheckedLocation] = useState(locations[0]);

    const onLocationChange = (location: string) => {
        setCheckedLocation(location);
    };

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

    const localizer = momentLocalizer(moment);

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

    const onNewEventButtonClick = (e: React.SyntheticEvent) => {
        setModalContent(
            <ExtraEvent
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
                        selectable={true}
                        step={15}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        onSelectEvent={onSelectEvent}
                        onSelectSlot={onSelectSlot}
                    />
                </OverflowWrapper>
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
            </CalendarWrapper>
        </>
    );
};
