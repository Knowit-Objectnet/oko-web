import * as React from 'react';
import styled from 'styled-components';
import { EventInfo } from '../../../../services/_deprecated/types';
import { SingleDayCalendar } from '../../../../components/_deprecated/calendar/SingleDayCalendar';
import { useState } from 'react';
import add from 'date-fns/add';
import { Event } from '../../../../components/_deprecated/events/Event';
import { useAuth } from '../../../../auth/useAuth';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    border: solid 2px ${(props) => props.theme.colors.LightBlue};
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
}

/*
 * Dropdown component for list items container a singleday calendar and event info view
 */
export const ListItemDropdown: React.FC<ListItemDropdownProps> = (props) => {
    const { user } = useAuth();
    // Select the first event that is owned by the logged in partner. It should never be undefined, but if it is
    // then it should cause problems as it simply won't open the sideview with event info.
    const firstOwnedEvent = () => props.events.find((event) => user.ownsResource(event.resource.partner.id.toString()));
    // State for handling the selected event to view info of
    const [selectedEvent, setSelectedEvent] = useState<EventInfo | undefined>(firstOwnedEvent());
    const selectedEventResource = selectedEvent && selectedEvent.resource;

    // On event click function
    const onSelectEvent = (event: EventInfo) => {
        if (user.ownsResource(event.resource.partner.id.toString())) {
            setSelectedEvent(event);
        }
    };

    const onDeleteEvent = (successful: boolean) => {
        if (selectedEvent && successful) {
            setSelectedEvent(undefined);
        }
    };

    // new min and mix which is set to 1 hour before and after event to give a cleaner look
    let newMin = new Date(props.min);
    newMin = add(newMin, { hours: -1 });
    let newMax = new Date(props.max);
    newMax = add(newMax, { hours: 1 });

    return (
        <Wrapper>
            <Calendar isEventSelected={selectedEvent !== undefined}>
                <SingleDayCalendar
                    date={props.date}
                    columns={[undefined]}
                    min={newMin}
                    max={newMax}
                    selectedEvent={selectedEventResource && selectedEventResource.eventId}
                    onSelectEvent={onSelectEvent}
                    events={[props.events]}
                />
            </Calendar>
            {selectedEvent && (
                <Event
                    key={`listItemDropdown-eventId-${selectedEvent.resource.eventId}`}
                    event={selectedEvent}
                    hideTitleBar={true}
                    afterDeleteRangeEvent={onDeleteEvent}
                    afterDeleteSingleEvent={onDeleteEvent}
                />
            )}
        </Wrapper>
    );
};
