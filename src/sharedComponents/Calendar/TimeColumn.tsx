import * as React from 'react';
import styled from 'styled-components';
import { TimeSlotGroup } from './TimeSlotGroup';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Colors, EventInfo, SlotInfo } from '../../types';
import { ColumnTitle } from './ColumnTitle';
import setMinutes from 'date-fns/setMinutes';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import add from 'date-fns/add';
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

    const [isSelectionActive, setIsSelectionActive] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<Array<HTMLDivElement>>([]);
    const [groups, setGroups] = useState<Array<JSX.Element>>([]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const temp: Array<JSX.Element> = [];
        for (let i = 0; i < Math.ceil(numberOfSlots / 2); i++) {
            temp.push(<TimeSlotGroup key={props.title + i} id={(i + 1) * 2} />);
        }
        setGroups(temp);
    }, []);

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

    const onClick = (event: EventInfo) => {
        if (props.onSelectEvent) {
            props.onSelectEvent(event);
        }
    };

    return (
        <Wrapper {...wrapperFunctions}>
            <ColumnTitle title={props.title} />
            <EventsSlotsWrapper>
                <Column {...columnFunctions}>{groups}</Column>
                <EventsColumn
                    events={props.events}
                    numberOfMinutes={numberOfMinutes}
                    deltaStart={props.min}
                    onClick={onClick}
                />
            </EventsSlotsWrapper>
            <Selection ref={ref} onMouseUp={onMouseUp}>
                <SelectionText>{getTimeString()}</SelectionText>
            </Selection>
        </Wrapper>
    );
};
