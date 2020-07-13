import * as React from 'react';
import styled from 'styled-components';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import { EventInfo } from '../../../types';
import { ListGroup } from './ListGroup';

const Wrapper = styled.div``;

interface ListViewProps {
    date: Date;
    events: Array<EventInfo>;
}

export const ListView: React.FC<ListViewProps> = (props) => {
    const day1 = props.date;
    const day2 = addDays(day1, 1);
    const day3 = addDays(day1, 2);
    const day4 = addDays(day1, 3);
    const day5 = addDays(day1, 4);
    const days = [day1, day2, day3, day4, day5];

    const day1Events = props.events.filter((event) => isSameDay(event.start, day1));
    const day2Events = props.events.filter((event) => isSameDay(event.start, day2));
    const day3Events = props.events.filter((event) => isSameDay(event.start, day3));
    const day4Events = props.events.filter((event) => isSameDay(event.start, day4));
    const day5Events = props.events.filter((event) => isSameDay(event.start, day5));
    const daysSortedEvents = [day1Events, day2Events, day3Events, day4Events, day5Events];

    return (
        <Wrapper>
            {daysSortedEvents.map((events, i) => (
                <ListGroup key={'day' + i} events={events} date={days[i]} />
            ))}
        </Wrapper>
    );
};
