import * as React from 'react';
import styled from 'styled-components';
import { TimeSlotGroup } from './TimeSlotGroup';
import { useEffect, useRef, useState } from 'react';
import { EventInfo, SlotInfo } from '../../types';
import { ColumnTitle } from './ColumnTitle';
import setMinutes from 'date-fns/setMinutes';
import { EventsColumn } from './EventsColumn';

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

interface TimeColumnProps {
    date: Date;
    min: Date;
    max: Date;
    step: number;
    title?: string;
    titleComponent?: React.ElementType;
    colNum: number;
    events?: Array<EventInfo>;
    selectable: boolean;
    onSelectEvent?: (eventInfo: EventInfo) => void;
    onSelectSlot?: (slotInfo: SlotInfo) => void;
    onSelecting?: (range: { start?: Date; end?: Date }) => boolean;
}

export const TimeColumn: React.FC<TimeColumnProps> = (props) => {
    // Get min and max that is tuned to the props.date's date
    const min = new Date(props.min);
    min.setFullYear(props.date.getFullYear(), props.date.getMonth(), props.date.getDate());
    const max = new Date(props.max);
    max.setFullYear(props.date.getFullYear(), props.date.getMonth(), props.date.getDate());

    // Number of minutes in the min-max rangee
    const numberOfMinutes = Math.round((max.getTime() - min.getTime()) / 60000);
    // Number of slots in the calendar
    const numberOfSlots = numberOfMinutes / props.step;

    // State to keep track of if a selection is active and which slots are selected
    const [isSelectionActive, setIsSelectionActive] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<Array<HTMLDivElement>>([]);
    // Slot groups to render
    const [groups, setGroups] = useState<Array<JSX.Element>>([]);
    // Ref to selection element
    const ref = useRef<HTMLDivElement>(null);

    // Constructor to render the timeslot groups
    useEffect(() => {
        const temp: Array<JSX.Element> = [];
        for (let i = 0; i < Math.ceil(numberOfSlots / 2); i++) {
            temp.push(<TimeSlotGroup key={'group' + props.colNum + i} id={(i + 1) * 2} />);
        }
        setGroups(temp);
    }, []);

    // effect to run every time a slot is added to the selected slots
    useEffect(() => {
        // If no slots are selected the the ref isnt null then set it's height to 0
        if (selectedSlots.length === 0 && ref.current !== null) {
            ref.current.style.height = '0px';
            // If it's the first selection and ref isnt null then update it's width, height and top position
        } else if (selectedSlots.length === 1 && ref.current !== null) {
            ref.current.style.width = selectedSlots[0].style.width + 'px';
            ref.current.style.top = selectedSlots[0].offsetTop + 40 + 'px';
            ref.current.style.height = selectedSlots[0].offsetHeight + 'px';
            // If it isnt the first selection and ref isnt null
        } else if (selectedSlots.length > 1 && ref.current !== null) {
            // Get the length of all the selected slots
            const length =
                selectedSlots[selectedSlots.length - 1].offsetTop -
                selectedSlots[0].offsetTop +
                selectedSlots[selectedSlots.length - 1].offsetHeight;
            // If it's positive then set the height of the selection element to the length
            if (length > 0) {
                ref.current.style.height = length + 'px';
                // If it's negative then the selection is going in reverse
                // Update the top position to the last selected event and update the length
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

    // Function to check if the selection is going downwords (normal) or upwards (reverse)
    const isReverse = (slots: HTMLDivElement[]) => {
        // If the length of the first to last element is negative then it's going reverse
        const length = slots[0].offsetTop - slots[slots.length - 1].offsetTop;
        if (length > 0) {
            return false;
        } else {
            return true;
        }
    };

    // Get the start time of the selected slots
    const getStart = (slots: HTMLDivElement[]) => {
        if (slots.length > 0) {
            // Get the id of the first element in the selection (depends on if its reverse or not)
            const relativeStartId = slots[isReverse(slots) ? 0 : slots.length - 1].dataset['id'];
            // If it doesnt exist then something is wrong and no start can be determined
            if (!relativeStartId) {
                return undefined;
            }
            // Remove one as the gutter is 0-based and multiply it by the step size
            const relativeStart = (parseInt(relativeStartId) - 1) * props.step;
            // Update the state
            return setMinutes(min, relativeStart);
        }
        return undefined;
    };

    // Get the end time of the selected slots
    const getEnd = (slots: HTMLDivElement[]) => {
        if (slots.length > 0) {
            // Get the id of the last element in the selection (depends on if its reverse or not)
            const relativeEndId = slots[isReverse(slots) ? slots.length - 1 : 0].dataset['id'];
            // If it doesnt exist then something is wrong and no start can be determined
            if (!relativeEndId) {
                return undefined;
            }
            // Multiply the id by the step size
            const relativeEnd = parseInt(relativeEndId) * props.step;
            // Update the state
            return setMinutes(min, relativeEnd);
        }
        return undefined;
    };

    // Mousedown function to signify the start of a selection
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // If the selection is already active then return
        if (isSelectionActive) return;

        // Get the slot the selection started on
        e.persist();
        const target = e.nativeEvent.target as HTMLDivElement;
        // If it doesnt exist then exit
        if (!target) return;

        // If the onSelection prop is set then execute and exit if it returns false
        if (props.onSelecting) {
            const res = props.onSelecting({ start: getStart([target]), end: getEnd([target]) });
            if (!res) return;
        }

        // Update the state to set the selection to active and add the target to the selected slots
        setIsSelectionActive(true);
        setSelectedSlots([target]);
    };

    // Mousedown function to signify the end of a selection
    const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // If the selection is already active then return
        if (!isSelectionActive) return;

        e.persist();
        // if the onSelection function is set in props
        if (props.onSelectSlot) {
            // get the start and end of the selected slots
            const start = getStart(selectedSlots);
            const end = getEnd(selectedSlots);

            if (!start || !end) return;

            // Create a slotInfo object
            const slotInfo: SlotInfo = {
                start: start,
                end: end,
            };

            // Call the onSelection function from props
            props.onSelectSlot(slotInfo);
        }

        // Deactivate the selection and reset the selected slots
        setIsSelectionActive(false);
        setSelectedSlots([]);
    };

    // Function that gets called when a new slot gets selected (entered)
    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // If the selection is already active then return
        if (!isSelectionActive) return;

        // Get the slot the selection is on
        e.persist();
        const target = e.nativeEvent.target as HTMLDivElement;
        // If it doesnt exist then exit
        if (!target) return;

        // If it isnt the first slot then check if the second to last to be selected.
        // if it is then remove the last slot selected. This means the user is moving in reverse direction
        if (selectedSlots.length > 1 && selectedSlots[selectedSlots.length - 2] === target) {
            const newSlots = selectedSlots.slice(0, selectedSlots.length - 2);
            setSelectedSlots(newSlots);
            // If it isnt then add it to selected slots
        } else if (!selectedSlots.includes(target)) {
            setSelectedSlots([...selectedSlots, target]);
        }
    };

    // Functions to add to the column if the selection is active
    const columnFunctions = props.selectable
        ? {
              onMouseUp: onMouseUp,
              onMouseDown: onMouseDown,
              onMouseMove: onMouseMove,
          }
        : {};
    // Functions to add to the wrapper if the selection is active
    // This is to stop the selection if the user moves outside the column
    const wrapperFunctions = props.selectable
        ? {
              onMouseLeave: onMouseUp,
          }
        : {};

    // Function to get pretty locale string
    const getTimeString = () => {
        const start = getStart(selectedSlots);
        const end = getEnd(selectedSlots);

        return (
            (start ? start.toLocaleString('no-NB', { hour: '2-digit', minute: '2-digit' }) : '') +
            ' - ' +
            (end ? end.toLocaleString('no-NB', { hour: '2-digit', minute: '2-digit' }) : '')
        );
    };

    // Event on click function
    const onClick = (event: EventInfo) => {
        if (props.onSelectEvent) {
            props.onSelectEvent(event);
        }
    };

    return (
        <Wrapper {...wrapperFunctions}>
            {props.titleComponent ? (
                <props.titleComponent date={props.date} />
            ) : props.title ? (
                <ColumnTitle title={props.title} />
            ) : null}
            <EventsSlotsWrapper>
                <Column {...columnFunctions}>{groups}</Column>
                <EventsColumn
                    date={props.date}
                    events={props.events}
                    numberOfMinutes={numberOfMinutes}
                    deltaStart={min}
                    onClick={onClick}
                />
            </EventsSlotsWrapper>
            <Selection ref={ref} onMouseUp={onMouseUp}>
                <SelectionText>{getTimeString()}</SelectionText>
            </Selection>
        </Wrapper>
    );
};
