import * as React from 'react';
import styled from 'styled-components';
import { EventInfo } from '../../../types';
import { ExpandableAgenda } from '../AmbassadorCalendar/ExpandableAgenda';

const Wrapper = styled.div``;

interface AmbassadorCalendarProps {
    date: Date;
    isToggled: boolean;
    onSelectEvent: (Event: EventInfo) => void;
    onWeekChange: (delta: -1 | 1) => void;
    events: Array<EventInfo>;
}

/*
 * Calendar and Agenda for station ambassadors
 */
export const AmbassadorCalendar: React.FC<AmbassadorCalendarProps> = (props) => {
    // Function that handles an event click in the calendar. It displays the Event in a modal
    const onSelectEvent = (event: EventInfo) => {
        props.onSelectEvent(event);
    };

    return (
        <Wrapper>
            <ExpandableAgenda
                date={props.date}
                isToggled={props.isToggled}
                onSelectEvent={onSelectEvent}
                events={props.events}
                onWeekChange={props.onWeekChange}
            />
        </Wrapper>
    );
};
