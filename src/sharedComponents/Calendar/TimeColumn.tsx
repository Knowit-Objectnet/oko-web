import * as React from 'react';
import styled from 'styled-components';
import { TimeSlotGroup } from './TimeSlotGroup';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Colors, SlotInfo } from '../../types';
import { ColumnTitle } from './ColumnTitle';
import setMinutes from 'date-fns/setMinutes';

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

const Div = styled.div`
    position: absolute;
    width: 80%;
    height: 0px;
    background-color: rgb(0, 0, 0, 0.2);
    pointer-events: none;
`;

interface TimeColumnProps {
    min: Date;
    max: Date;
    step: number;
    title: string;
    selectable: boolean;
    onSelectSlot?: (slotInfo: SlotInfo) => void;
}

export const TimeColumn: React.FC<TimeColumnProps> = (props) => {
    const numberOfSlots = (props.max.getTime() - props.min.getTime()) / 60000 / props.step;

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
            ref.current.style.top = selectedSlots[0].offsetTop + 'px';
            ref.current.style.height = selectedSlots[0].style.height;
        } else if (selectedSlots.length > 1 && ref.current !== null) {
            const length = selectedSlots[selectedSlots.length - 1].offsetTop - selectedSlots[0].offsetTop;
            if (length > 0) {
                ref.current.style.height = length + 'px';
            } else {
                ref.current.style.top = selectedSlots[selectedSlots.length - 1].offsetTop + 'px';
                ref.current.style.height = Math.abs(length) + 'px';
            }
        }
    }, [selectedSlots]);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isSelectionActive) return;

        e.persist();
        const target = e.nativeEvent.target as HTMLDivElement;
        if (!target) return;

        setIsSelectionActive(true);
        setSelectedSlots([target]);
    };

    const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isSelectionActive) return;

        e.persist();

        if (props.onSelectSlot) {
            const relativeStartId = selectedSlots[0].dataset['id'];
            const relativeEndId = selectedSlots[selectedSlots.length - 1].dataset['id'];

            if (!relativeStartId || !relativeEndId) throw new Error('Unexpected error in time retrieval');

            const relativeStart = (parseInt(relativeStartId) - 1) * props.step;
            const relativeEnd = (parseInt(relativeEndId) - 1) * props.step;

            const start = setMinutes(props.min, relativeStart);
            const end = setMinutes(props.min, relativeEnd);

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

    return (
        <Wrapper {...wrapperFunctions}>
            <ColumnTitle title={props.title} />
            <Column {...columnFunctions}>{groups}</Column>
            <Div ref={ref} onMouseUp={onMouseUp}></Div>
        </Wrapper>
    );
};
