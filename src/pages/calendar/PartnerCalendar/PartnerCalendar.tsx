import * as React from 'react';
import styled from 'styled-components';
import { ExpandableAgenda } from './ExpandableAgenda';
import { EventInfo } from '../../../types';
const Wrapper = styled.div``;

interface PartnerCalendarProps {
    date: Date;
    isToggled: boolean;
    onSelectEvent: (Event: EventInfo) => void;
    onWeekChange: (delta: -1 | 1) => void;
    events: Array<EventInfo>;
    deleteEvent: (event: EventInfo) => void;
}

/*
 * Calendar and Agenda for partners
 */
export const PartnerCalendar: React.FC<PartnerCalendarProps> = (props) => {
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
                deleteEvent={props.deleteEvent}
            />
        </Wrapper>
    );
};
