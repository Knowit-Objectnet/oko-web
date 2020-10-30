import * as React from 'react';
import styled from 'styled-components';
import { EventInfo } from '../../../types';
import { SingleDayCalendar } from '../../../sharedComponents/Calendar/SingleDayCalendar';
import { useState } from 'react';
import add from 'date-fns/add';
import { Colors } from '../../../theme';
import { Event } from '../../../sharedComponents/Events/Event';

interface WrapperProps {
    color: Colors;
}

const Wrapper = styled.div<WrapperProps>`
    width: 100%;
    display: flex;
    border: solid 2px ${(props) => props.color};
    border-top: none;
    box-sizing: border-box;

    &:not(last-child) {
        margin-bottom: 2px;
    }
`;

interface CalendarProps {
    isEventSelected: boolean;
}

const Calendar = styled.div<CalendarProps>`
    width: ${(props) => (props.isEventSelected ? '40%' : '100%')};
`;

interface ListItemDropdownProps {
    events: Array<EventInfo>;
    date: Date;
    min: Date;
    max: Date;
    color: Colors;
}

/*
 * Dropdown component for list items container a singleday calendar and event info view
 */
export const ListItemDropdown: React.FC<ListItemDropdownProps> = (props) => {
    // State for handling the selected event to view info of
    const [selectedEvent, setSelectedEvent] = useState<EventInfo | null>(null);

    // On event click function
    const onSelectEvent = (event: EventInfo) => {
        setSelectedEvent(event);
    };

    const onDeleteEvent = (successful: boolean) => {
        if (selectedEvent && successful) {
            setSelectedEvent(null);
        }
    };

    // new min and mix which is set to 1 hour before and after event to give a cleaner look
    let newMin = new Date(props.min);
    newMin = add(newMin, { hours: -1 });
    let newMax = new Date(props.max);
    newMax = add(newMax, { hours: 1 });

    return (
        <Wrapper color={props.color}>
            <Calendar isEventSelected={selectedEvent !== null}>
                <SingleDayCalendar
                    date={props.date}
                    columns={[undefined]}
                    min={newMin}
                    max={newMax}
                    onSelectEvent={onSelectEvent}
                    events={[props.events]}
                />
            </Calendar>
            {selectedEvent && (
                <Event
                    event={selectedEvent}
                    hideTitleBar={true}
                    afterDeleteRangeEvent={onDeleteEvent}
                    afterDeleteSingleEvent={onDeleteEvent}
                />
            )}
        </Wrapper>
    );
};
