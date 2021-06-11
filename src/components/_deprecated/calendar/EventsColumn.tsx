import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { EventInfo } from '../../../services/_deprecated/types';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import add from 'date-fns/add';
import { Event } from './Event';
import { useAuth } from '../../../auth/useAuth';

const Events = styled.div`
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
`;

interface EventsColumnProps {
    date: Date;
    events?: Array<EventInfo>;
    numberOfMinutes: number;
    deltaStart: Date;
    onClick: (event: EventInfo) => void;
    selectedEvent?: number;
}

/*
 * Events column component to render events in the calendar
 */
export const EventsColumn: React.FC<EventsColumnProps> = (props) => {
    const { user } = useAuth();
    // Ref to the events column (used to get the height of the calendar)
    const eventsRef = useRef<HTMLDivElement>(null);
    // List of the rendered events
    const [renderedEvents, setRenderedEvents] = useState<Array<JSX.Element>>([]);

    /*
     *   Function to generate the placement of the events in the column
     */
    const generateEventsPlacement = (events: Array<EventInfo>) => {
        // Step 1: compute timesteps if applicable
        const timeslots: Array<number> = Array(props.numberOfMinutes).fill(0);

        // Step 2: for each timestep , find the amount of the events that are covered by it
        timeslots.forEach((val, i) => {
            events.forEach((event) => {
                // Get the start and end time for the slot (1 minute)
                const slotStart = add(props.deltaStart, { minutes: i });
                const slotEnd = add(props.deltaStart, { minutes: i + 1 });
                // Check if theres overlap between the event and the slot
                const overlap = areIntervalsOverlapping(
                    {
                        start: slotStart,
                        end: slotEnd,
                    },
                    {
                        start: event.start,
                        end: event.end,
                    },
                );
                if (overlap) timeslots[i] += 1;
            });
        });

        // Step 3: for each event, compute the maximum breadth they can have
        const widthEvents = events.map((event, i) => {
            // Get the start and end in minutes
            const start = (event.start.getTime() - props.deltaStart.getTime()) / 60000;
            const end = (event.end.getTime() - props.deltaStart.getTime()) / 60000;
            // Get the tiemslots range
            const timeslotRange = timeslots.slice(start, end);
            // Get the highest number of parallell events in the timeslot range
            const max = Math.max(...timeslotRange);
            // Set the width
            const width = 1 / max;
            return {
                ...event,
                index: i,
                width: width * 100,
            };
        });

        // Step 4: Create a matrix for the timeslots to keep track of each height*width
        const matrix = timeslots.map((timeslot) => Array(timeslot ? timeslot : 1).fill(0));

        // Step 5: Sort the events by their starting time
        widthEvents.sort((eventA, eventB) => eventA.start.getTime() - eventB.start.getTime());

        // Step 6: Assign Events to the earliest available slot ( to find the slot for each of the events)
        const assignedEvents = widthEvents.map((event) => {
            // Get the start of the event
            const startPos = Math.ceil((event.start.getTime() - props.deltaStart.getTime()) / 60000);
            // Get the length of the event
            const length = (event.end.getTime() - event.start.getTime()) / 60000;
            // The width position in the slot
            let wPos = -1;
            // The width length
            let wLen = 1;
            // If one of the positions in the slot is free then set wPos and WLen and set the position to 1
            // to indicate its now taken
            matrix[startPos].some((val, index, arr) => {
                if (val === 0) {
                    wPos = index;
                    wLen = arr.length;
                    return true;
                }
            });
            // Step 6.5: When assigning, also assign it to the cells below as to avoid overlap when reassigning
            for (let i = startPos; i < startPos + length; i++) {
                if (matrix[i].length < wLen) {
                    matrix[i] = [...Array(matrix[i].length).fill(1), ...Array(wLen - matrix[i].length).fill(0)];
                }
                matrix[i][wPos] = 1;
            }

            // Return the event with it's wPos, wLen and length
            return {
                ...event,
                wPos: wPos,
                wLen: wLen,
                length: length,
            };
        });

        // Step 7: Assign a new width if needed as we now know how the events are positioned in slots
        return assignedEvents.map((event) => {
            // Get the start of the event
            const startPos = Math.ceil((event.start.getTime() - props.deltaStart.getTime()) / 60000);

            // Save a old value of the wLen to check if its updated later
            const oldWLen = event.wLen.valueOf();

            // Loop over the elements and give it the wLen of the longest filled row
            for (let i = startPos; i < startPos + event.length; i++) {
                if (matrix[i].every((el) => el === 1) && matrix[i].length > event.wLen) {
                    event.wLen = matrix[i].length;
                }
            }

            // If the wLen is not updated then we keep the old width, as there is no reason to change,
            // but if it's changed then we need to update the width to make it fit into the new length
            const newWidth = oldWLen === event.wLen ? event.width : (1 / event.wLen) * 100;

            // Return the event with it's updated width
            return {
                ...event,
                width: newWidth,
            };
        });
    };

    // On event click function
    const onEventClick = (index: number | undefined) => {
        if (props.events && index !== undefined) {
            // Find the correct event and call the prop function
            const event = props.events[index];
            if (event) props.onClick(event);
        }
    };

    // Startup function to call when the column is finished rendered such that the
    // height is correct
    useEffect(() => {
        // If the ref and clientHeight exists, and there's events
        if (eventsRef.current && eventsRef.current.clientHeight > 0 && props.events) {
            // Get the height of the eveent column
            const height = eventsRef.current.clientHeight;
            // Get the pixel per min
            const pxPerMin = height / props.numberOfMinutes;
            // Get a temp date object
            const tempDate = new Date(props.date);
            // Only get valid events between 07:00-20:00
            const validEvents = props.events.filter(
                (event) =>
                    event.start > new Date(tempDate.setHours(7, 0)) && event.end < new Date(tempDate.setHours(20, 0)),
            );
            // Generated the event placements
            const toBeRenderedEvents = generateEventsPlacement(validEvents);

            // temp array for the events
            const temp: Array<JSX.Element> = [];
            // loop over the events and create them
            toBeRenderedEvents.forEach((event) => {
                // Get the start time
                const start = Math.ceil((event.start.getTime() - props.deltaStart.getTime()) / 60000);
                // add the newly created event to the list
                temp.push(
                    <Event
                        top={start * pxPerMin}
                        left={(event.wPos / event.wLen) * 100}
                        width={event.width}
                        height={event.length * pxPerMin}
                        title={event.title}
                        key={event.title + event.wPos + event.start.getTime()}
                        index={event.index}
                        onClick={onEventClick}
                        selected={
                            props.selectedEvent === undefined
                                ? undefined
                                : props.selectedEvent === event.resource.eventId
                        }
                        userIsOwner={user.isPartner && user.ownsResource(event.resource.partner.id)}
                    />,
                );
            });
            // Add the events to the state
            setRenderedEvents(temp);
        }
    }, [eventsRef.current, props.events, props.selectedEvent]);

    return <Events ref={eventsRef}>{renderedEvents}</Events>;
};
