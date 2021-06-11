import * as React from 'react';
import styled from 'styled-components';
import { TimeSlotGroup } from './TimeSlotGroup';
import { useEffect, useState } from 'react';
import { EventInfo } from '../../../services/deprecated/types';
import { ColumnTitle } from './ColumnTitle';
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

interface TimeColumnProps {
    date: Date;
    min: Date;
    max: Date;
    step: number;
    title?: string;
    titleComponent?: React.ElementType;
    colNum: number;
    events?: Array<EventInfo>;
    selectedEvent?: number;
    onSelectEvent?: (eventInfo: EventInfo) => void;
}

export const TimeSlotColumn: React.FC<TimeColumnProps> = (props) => {
    // Get min and max that is tuned to the props.date's date
    const min = new Date(props.min);
    min.setFullYear(props.date.getFullYear(), props.date.getMonth(), props.date.getDate());
    const max = new Date(props.max);
    max.setFullYear(props.date.getFullYear(), props.date.getMonth(), props.date.getDate());

    // Number of minutes in the min-max rangee
    const numberOfMinutes = Math.round((max.getTime() - min.getTime()) / 60000);
    // Number of slots in the calendar
    const numberOfSlots = numberOfMinutes / props.step;

    // Slot groups to render
    const [groups, setGroups] = useState<Array<JSX.Element>>([]);

    // Constructor to render the timeslot groups
    useEffect(() => {
        const temp: Array<JSX.Element> = [];
        for (let i = 0; i < Math.ceil(numberOfSlots / 2); i++) {
            temp.push(<TimeSlotGroup key={'group' + props.colNum + i} id={(i + 1) * 2} />);
        }
        setGroups(temp);
    }, [numberOfSlots, props.colNum]);

    // Event on click function
    const onClick = (event: EventInfo) => {
        if (props.onSelectEvent) {
            props.onSelectEvent(event);
        }
    };

    return (
        <Wrapper>
            {props.titleComponent ? (
                <props.titleComponent date={props.date} />
            ) : (
                props.title && <ColumnTitle title={props.title} />
            )}
            <EventsSlotsWrapper>
                <Column>{groups}</Column>
                <EventsColumn
                    date={props.date}
                    events={props.events}
                    numberOfMinutes={numberOfMinutes}
                    deltaStart={min}
                    onClick={onClick}
                    selectedEvent={props.selectedEvent}
                />
            </EventsSlotsWrapper>
        </Wrapper>
    );
};
