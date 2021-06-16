import React from 'react';
import { CalendarEvent } from '../hooks/useCalendarEvents';
import { EventComponent } from './EventComponent';

interface Props {
    onClick: () => void;
    event: CalendarEvent;
}

export const MonthViewEvent: React.FC<Props> = ({ event, onClick }) => {
    return <EventComponent onClick={onClick} event={event} />;
};
