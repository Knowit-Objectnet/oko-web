import * as React from 'react';
import { Clock } from '@styled-icons/fa-regular/Clock';
import { EventOption } from './EventOption';

interface EventOptionDateRangeProps {
    start: Date;
    end: Date;
}

export const EventOptionDateRange: React.FC<EventOptionDateRangeProps> = (props) => (
    <EventOption icon={Clock}>
        {`
            ${props.start.toLocaleString('no-NB', { month: 'long', day: 'numeric', year: 'numeric' })},
            ${props.start.getHours()} - 
            ${props.end.getHours()}
        `}
    </EventOption>
);
