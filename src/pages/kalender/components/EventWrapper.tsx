import * as React from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import { CalendarEvent } from '../hooks/useCalendarEvents';
import { WeekOrDayEvent } from './WeekOrDayEvent';
import { EventComponent } from './EventComponent';

export const EventWrapper: React.FC<EventWrapperProps<CalendarEvent>> = ({ style, event }) => {
    // This is a bit "hacky", but the easiest way I've been able to find for identifying the
    // current type of view for the Calendar. The month view renders the wrapper component differently.
    const viewIsWeekOrDay = style !== undefined;

    if (viewIsWeekOrDay) {
        return <WeekOrDayEvent event={event} style={style} />;
    }
    return <EventComponent event={event} compactView />;
};
