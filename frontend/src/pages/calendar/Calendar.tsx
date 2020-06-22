import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { eventInfo } from '../../types';
import { useGetCalendarEvents } from '../../hooks/useGetCalendarEvents';

const localizer = momentLocalizer(moment);

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    width: 100%;
`;

export const CalendarPage: React.FC<null> = () => {
    const dummyData: Array<eventInfo> = [
        {
            title: 'Test',
            start: new Date(new Date().setHours(10)),
            end: new Date(new Date().setHours(12)),
            allDay: false,
            resource: {
                location: 'grønmo',
                driver: 'odd',
                weight: 100,
            },
        },
    ];
    let events = useGetCalendarEvents();
    events = events.length !== 0 ? events : dummyData;

    // eslint-disable-next-line
    const onSelectEvent = (event: Object, e: React.SyntheticEvent) => {
        console.log(event);
    };

    return (
        <Wrapper>
            <Calendar
                localizer={localizer}
                defaultView="week"
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={onSelectEvent}
            />
        </Wrapper>
    );
};
