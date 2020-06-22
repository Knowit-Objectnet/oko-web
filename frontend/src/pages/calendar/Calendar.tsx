import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    width: 100%;
`;

const myEventsList = [{ title: 'testEvent', start: new Date(), end: new Date().setHours(12), allDay: false }];

export const CalendarPage: React.FC<null> = () => {
    return (
        <Wrapper>
            <Calendar localizer={localizer} events={myEventsList} startAccessor="start" endAccessor="end" />
        </Wrapper>
    );
};
