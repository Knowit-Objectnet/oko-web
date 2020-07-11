import * as React from 'react';
import styled from 'styled-components';
import { Colors, EventInfo } from '../../types';
import { useEffect, useRef, useState } from 'react';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import add from 'date-fns/add';

const Events = styled.div`
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
`;

interface EventProps {
    top: number;
    left: number;
    height: number;
    width: number;
}

const Event = styled.div<EventProps>`
    position: absolute;
    pointer-events: auto;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}%;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}%;
    &:nth-child(n + 1) {
        background-color: ${Colors.DarkBlue};
        color: ${Colors.White};
    }
    &:nth-child(n + 2) {
        background-color: ${Colors.DarkGreen};
        color: ${Colors.White};
    }
    &:nth-child(n + 3) {
        background-color: ${Colors.LightBlue};
        color: ${Colors.Black};
    }
    &:nth-child(n + 4) {
        background-color: ${Colors.Green};
        color: ${Colors.Black};
    }
    &:nth-child(n + 5) {
        background-color: ${Colors.Red};
        color: ${Colors.Black};
    }
    &:nth-child(n + 6) {
        background-color: ${Colors.LightGreen};
        color: ${Colors.Black};
    }
    &:nth-child(n + 7) {
        background-color: ${Colors.DarkBegie};
        color: ${Colors.White};
    }
    &:nth-child(n + 8) {
        background-color: ${Colors.Yellow};
        color: ${Colors.Black};
    }
    &:nth-child(n + 9) {
        background-color: ${Colors.LightBeige};
        color: ${Colors.Black};
    }
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EventText = styled.span`
    text-overflow: ellipsis;
    overflow: hidden;
`;

interface EventsColumnProps {
    events?: Array<EventInfo>;
    numberOfMinutes: number;
    deltaStart: Date;
    onClick: (event: EventInfo) => void;
}

export const EventsColumn: React.FC<EventsColumnProps> = (props) => {
    const eventsRef = useRef<HTMLDivElement>(null);
    const [renderedEvents, setRenderedEvents] = useState<Array<JSX.Element>>([]);

    /*
     *   Function to generate the placement of the events in the column
     */
    const generateEventsPlacement = (events: Array<EventInfo>) => {
        // Step 1: compute timesteps if applicable
        const timeslots: Array<number> = Array(props.numberOfMinutes).fill(0);

        // Step 2: for each timestep , find the amount of the events that are covered by it (O(n))
        timeslots.forEach((val, i) => {
            events.forEach((event) => {
                const slotStart = add(props.deltaStart, { minutes: i });
                const slotEnd = add(props.deltaStart, { minutes: i + 1 });
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

        // Step 3: for each event, compute the maximum breadth they can have (O(n) after the former step)
        const widthEvents = events.map((event, i) => {
            const start = (event.start.getTime() - props.deltaStart.getTime()) / 60000;
            const end = (event.end.getTime() - props.deltaStart.getTime()) / 60000;
            const timeslotRange = timeslots.slice(start, end);
            const max = Math.max(...timeslotRange);
            const width = 1 / max;
            return {
                ...event,
                index: i,
                width: width * 100,
            };
        });

        // Step 4: Create a matrix for the timeslots to keep track of each height*width (this is O(n²))
        const matrix = timeslots.map((timeslot) => Array(timeslot ? timeslot : 1).fill(0));

        // Step 5: For each event (ordered by start time = O(n*logn)),
        widthEvents.sort((eventA, eventB) => eventA.start.getTime() - eventB.start.getTime());

        // Step 6: Assign Events to the earliest available slot (O(n) to find the slot for each of the O(n) events => O(n²))
        const orderedEvents = widthEvents.map((event) => {
            const startPos = Math.ceil((event.start.getTime() - props.deltaStart.getTime()) / 60000);
            const length = (event.end.getTime() - event.start.getTime()) / 60000;
            let wPos = -1;
            let wLen = 1;
            matrix[startPos].some((val, index, arr) => {
                if (val === 0) {
                    wPos = index;
                    wLen = arr.length;
                    return true;
                }
            });
            // Step 6.5: When assigning, also assign it to the cells below as to avoid overlap when reassigning
            for (let i = startPos; i < startPos + length; i++) {
                matrix[i][wPos] = 1;
            }
            return {
                ...event,
                wPos: wPos,
                wLen: wLen,
                length: length,
            };
        });

        return orderedEvents;
    };

    const onEventClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.persist();
        const index = e.currentTarget.dataset['index'];
        if (props.events && index) {
            const event = props.events[parseInt(index)];
            if (event) props.onClick(event);
        }
    };

    useEffect(() => {
        if (eventsRef.current && eventsRef.current.clientHeight > 0 && props.events) {
            const height = eventsRef.current.clientHeight;
            const pxPerMin = height / props.numberOfMinutes;
            const tempDate = new Date();
            const validEvents = props.events.filter(
                (event) =>
                    event.start > new Date(tempDate.setHours(7, 0)) && event.end < new Date(tempDate.setHours(20, 0)),
            );
            const toBeRenderedEvents = generateEventsPlacement(validEvents);

            const temp: Array<JSX.Element> = [];
            toBeRenderedEvents.forEach((event) => {
                const start = Math.ceil((event.start.getTime() - props.deltaStart.getTime()) / 60000);
                temp.push(
                    <Event
                        top={start * pxPerMin}
                        left={(event.wPos / event.wLen) * 100}
                        width={event.width}
                        height={event.length * pxPerMin}
                        key={event.title}
                        data-index={event.index}
                        onClick={onEventClick}
                    >
                        <EventText>{event.title}</EventText>
                    </Event>,
                );
            });
            setRenderedEvents(temp);
        }
    }, [eventsRef.current]);

    return <Events ref={eventsRef}>{renderedEvents}</Events>;
};
