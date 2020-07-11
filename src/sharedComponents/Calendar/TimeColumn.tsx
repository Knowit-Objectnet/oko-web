import * as React from 'react';
import styled, { StyledComponent } from 'styled-components';
import { TimeSlotGroup } from './TimeSlotGroup';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Colors, EventInfo, SlotInfo } from '../../types';
import { ColumnTitle } from './ColumnTitle';
import setMinutes from 'date-fns/setMinutes';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import add from 'date-fns/add';

const EventsSlotsWrapper = styled.div`
    position: relative;
`;

const Column = styled.div``;

const Wrapper = styled.div`
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100%;

    border-right: 1px solid #ddd;

    &:last-child {
        border-right: none;
    }
    background-color: ${Colors.LightBlue};
`;

const Selection = styled.div`
    position: absolute;
    width: 80%;
    height: 0px;
    background-color: rgb(0, 0, 0, 0.2);
    pointer-events: none;
    overflow: hidden;
    z-index: 10;
`;

const SelectionText = styled.span`
    flex-wrap: wrap;
    font-size: small;
`;

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

interface TimeColumnProps {
    min: Date;
    max: Date;
    step: number;
    title: string;
    events?: Array<EventInfo>;
    selectable: boolean;
    onSelectEvent?: (eventInfo: EventInfo) => void;
    onSelectSlot?: (slotInfo: SlotInfo) => void;
    onSelecting?: (range: { start?: Date; end?: Date }) => boolean;
}

export const TimeColumn: React.FC<TimeColumnProps> = (props) => {
    const numberOfMinutes = (props.max.getTime() - props.min.getTime()) / 60000;
    const numberOfSlots = numberOfMinutes / props.step;

    const groups = [];

    for (let i = 0; i < Math.ceil(numberOfSlots / 2); i++) {
        groups.push(<TimeSlotGroup key={props.title + i} id={(i + 1) * 2} />);
    }

    const [isSelectionActive, setIsSelectionActive] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<Array<HTMLDivElement>>([]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedSlots.length === 0 && ref.current !== null) {
            ref.current.style.height = '0px';
        } else if (selectedSlots.length === 1 && ref.current !== null) {
            ref.current.style.width = selectedSlots[0].style.width + 'px';
            ref.current.style.top = selectedSlots[0].offsetTop + 40 + 'px';
            ref.current.style.height = selectedSlots[0].offsetHeight + 'px';
        } else if (selectedSlots.length > 1 && ref.current !== null) {
            const length =
                selectedSlots[selectedSlots.length - 1].offsetTop -
                selectedSlots[0].offsetTop +
                selectedSlots[selectedSlots.length - 1].offsetHeight;
            if (length > 0) {
                ref.current.style.height = length + 'px';
            } else {
                const reversedLength =
                    selectedSlots[0].offsetTop -
                    selectedSlots[selectedSlots.length - 1].offsetTop +
                    selectedSlots[selectedSlots.length - 1].offsetHeight;
                ref.current.style.top = selectedSlots[selectedSlots.length - 1].offsetTop + 40 + 'px';
                ref.current.style.height = Math.abs(reversedLength) + 'px';
            }
        }
    }, [selectedSlots]);

    const isReverse = (slots: HTMLDivElement[]) => {
        const length = slots[0].offsetTop - slots[slots.length - 1].offsetTop;
        if (length > 0) {
            return false;
        } else {
            return true;
        }
    };

    const getStart = (slots: HTMLDivElement[]) => {
        if (slots.length > 0) {
            const relativeStartId = slots[isReverse(slots) ? 0 : slots.length - 1].dataset['id'];
            if (!relativeStartId) {
                return undefined;
            }
            const relativeStart = (parseInt(relativeStartId) - 1) * props.step;
            return setMinutes(props.min, relativeStart);
        }
        return undefined;
    };

    const getEnd = (slots: HTMLDivElement[]) => {
        if (slots.length > 0) {
            const relativeEndId = slots[isReverse(slots) ? slots.length - 1 : 0].dataset['id'];
            if (!relativeEndId) {
                return undefined;
            }
            const relativeEnd = parseInt(relativeEndId) * props.step;
            return setMinutes(props.min, relativeEnd);
        }
        return undefined;
    };

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isSelectionActive) return;

        e.persist();
        const target = e.nativeEvent.target as HTMLDivElement;
        if (!target) return;

        if (props.onSelecting) {
            const res = props.onSelecting({ start: getStart([target]), end: getEnd([target]) });
            if (!res) return;
        }

        setIsSelectionActive(true);
        setSelectedSlots([target]);
    };

    const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isSelectionActive) return;

        e.persist();
        if (props.onSelectSlot) {
            const start = getStart(selectedSlots);
            const end = getEnd(selectedSlots);

            if (!start || !end) return;

            const slotInfo: SlotInfo = {
                start: start,
                end: end,
            };

            props.onSelectSlot(slotInfo);
        }

        setIsSelectionActive(false);
        setSelectedSlots([]);
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isSelectionActive) return;

        e.persist();
        const target = e.nativeEvent.target as HTMLDivElement;
        if (!target) return;

        if (selectedSlots.length > 1 && selectedSlots[selectedSlots.length - 2] === target) {
            const newSlots = selectedSlots.slice(0, selectedSlots.length - 2);
            setSelectedSlots(newSlots);
        } else if (!selectedSlots.includes(target)) {
            setSelectedSlots([...selectedSlots, target]);
        }
    };

    const columnFunctions = props.selectable
        ? {
              onMouseUp: onMouseUp,
              onMouseDown: onMouseDown,
              onMouseMove: onMouseMove,
          }
        : {};
    const wrapperFunctions = props.selectable
        ? {
              onMouseLeave: onMouseUp,
          }
        : {};

    const getTimeString = () => {
        const start = getStart(selectedSlots);
        const end = getEnd(selectedSlots);

        return (
            (start ? start.toLocaleString('no-NB', { hour: '2-digit', minute: '2-digit' }) : '') +
            ' - ' +
            (end ? end.toLocaleString('no-NB', { hour: '2-digit', minute: '2-digit' }) : '')
        );
    };

    /*
     *   Problem: We have 0-infinity events that can be placed anywhere in the calendar
     *      and 0-infinity of them can be partially or fully parallel (meaning that
     *      they can start and end at different times, but at some point they are
     *      parallel). The width of an event should be 1/n where n is the
     *      highest amount of events that are parallel at once during the events
     *      time range. This applies to all events
     *
     *   Algorithm:
     *   Step 1: compute timesteps if applicable
     *       (simple enough to compute those, essentially the "All-Unique"-
     *       problem which has a provable worst-case of n*logn)
     *
     *   Step 2: for each timestep , find the amount of the events that are covered by it (O(n))
     *
     *   Step 3: for each event, compute the maximum breadth they can have (O(n) after the former step)
     *
     *   Step 4: Create a matrix for the timeslots to keep track of each height*width (this is O(n²))
     *
     *   Step 5: For each event (ordered by start time = O(n*logn)),
     *       assign it to the earliest available slot (O(n) to find the slot for each of the O(n) events => O(n²))
     *
     *   Step 6: When assigning, also assign it to the cells below as to avoid overlap when reassigning
     *
     *   Step 7: Assign a property to the event signifying where it starts -
     *       to avoid redoing all this computation when rendering
     */
    const generateEventsPlacement = (events: Array<EventInfo>) => {
        // Step 1
        const timeslots: Array<number> = Array(numberOfMinutes).fill(0);

        // Step 2
        timeslots.forEach((val, i) => {
            events.forEach((event, j) => {
                const slotStart = add(props.min, { minutes: i });
                const slotEnd = add(props.min, { minutes: i + 1 });
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

        // Step 3
        const widthEvents = events.map((event, i) => {
            const start = (event.start.getTime() - props.min.getTime()) / 60000;
            const end = (event.end.getTime() - props.min.getTime()) / 60000;
            const timeslotRange = timeslots.slice(start, end);
            const max = Math.max(...timeslotRange);
            const width = 1 / max;
            return {
                ...event,
                index: i,
                width: width * 100,
            };
        });

        // Step 4
        const matrix = timeslots.map((timeslot) => Array(timeslot ? timeslot : 1).fill(0));

        // Step 5
        widthEvents.sort((eventA, eventB) => eventA.start.getTime() - eventB.start.getTime());

        const orderedEvents = widthEvents.map((event) => {
            const startPos = Math.ceil((event.start.getTime() - props.min.getTime()) / 60000);
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
        // Step 6

        // Step 7
    };
    if (props.events) {
        generateEventsPlacement(props.events);
    }

    const eventsRef = useRef<HTMLDivElement>(null);
    const [renderedEvents, setRenderedEvents] = useState<Array<JSX.Element>>([]);

    const onEventClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.onSelectEvent) {
            e.persist();
            const index = e.currentTarget.dataset['index'];
            if (props.events && index) {
                const event = props.events[parseInt(index)];
                if (event) props.onSelectEvent(event);
            }
        }
    };

    useEffect(() => {
        if (eventsRef.current && props.events) {
            const height = eventsRef.current.clientHeight;
            const pxPerMin = height / numberOfMinutes;
            const toBeRenderedEvents = generateEventsPlacement(props.events);

            const temp: Array<JSX.Element> = [];
            toBeRenderedEvents.forEach((event) => {
                const start = Math.ceil((event.start.getTime() - props.min.getTime()) / 60000);
                temp.push(
                    <Event
                        top={start * pxPerMin}
                        left={event.wPos / event.wLen * 100}
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
    }, [eventsRef]);

    return (
        <Wrapper {...wrapperFunctions}>
            <ColumnTitle title={props.title} />
            <EventsSlotsWrapper>
                <Column {...columnFunctions}>{groups}</Column>
                <Events ref={eventsRef}>{renderedEvents}</Events>
            </EventsSlotsWrapper>
            <Selection ref={ref} onMouseUp={onMouseUp}>
                <SelectionText>{getTimeString()}</SelectionText>
            </Selection>
        </Wrapper>
    );
};
