import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Agenda } from './Agenda';
import { SingleDayCalendar } from '../../../sharedComponents/Calendar/SingleDayCalendar';
import { useKeycloak } from '@react-keycloak/web';
import { EventInfo, SlotInfo } from '../../../types';
import ArrowUp from '../../../assets/ArrowUp.svg';
import ArrowDown from '../../../assets/ArrowDown.svg';

const Wrapper = styled.div``;

const Header = styled.div`
    font-weight: bold;
    font-size: 15px;
    line-height: 21px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

const DateText = styled.span`
    margin-right: 20px;
`;

interface ExpandableAgendaProps {
    date: Date;
    columns: Array<string>;
    events: Array<Array<EventInfo>>;
    onSelectSlot: (slot: SlotInfo) => void;
    onSelectEvent: (event: EventInfo) => void;
}

/*
 * Agenda component that expands into a week calendar
 */
export const ExpandableAgenda: React.FC<ExpandableAgendaProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    // State for handling expansion of the agenda/calendar
    const [expanded, setExpanded] = useState(false);

    // Function to set a date to the props.date's year, month, date
    const setDate = (date: Date) => {
        return date.setFullYear(props.date.getFullYear(), props.date.getMonth(), props.date.getDate());
    };

    // Function that handles an event click in the calendar. It displays the Event in a modal
    const onSelectEvent = (event: EventInfo) => {
        const eventProps: EventInfo = event as EventInfo;
        props.onSelectEvent(eventProps);
    };

    // Function that handles time range selection in the calendar
    const onSelectSlot = (slotInfo: SlotInfo) => {
        // Create max and min times on the slotInfo date
        const minTime = new Date(slotInfo.start);
        minTime.setHours(7, 0);
        const maxTime = new Date(slotInfo.end);
        maxTime.setHours(20, 0);

        // If the start is less than the allowed minimum then set the start to minimum
        if (slotInfo.start < minTime) {
            slotInfo.start = minTime;
            // If the start is more than the allowed maximum then set the start to maximum
        } else if (slotInfo.start > maxTime) {
            slotInfo.start = maxTime;
        }
        // If the end is less than the start time then set it to the start time
        if (slotInfo.end < slotInfo.start) {
            slotInfo.end = slotInfo.start;
            // If the end is more than the allowed maximum then set the end to maximum
        } else if (slotInfo.end > maxTime) {
            slotInfo.end = maxTime;
        }

        props.onSelectSlot(slotInfo);
    };

    // On expansion button click
    const onExpandClick = () => {
        setExpanded(!expanded);
    };

    // Min and max dates for the calendar
    const min = new Date(props.date);
    min.setHours(7, 0, 0, 0);
    const max = new Date(props.date);
    max.setHours(20, 0, 0, 0);

    return (
        <Wrapper>
            <Header>
                <DateText>
                    {props.date.toLocaleString('nb-NO', { weekday: 'long', month: 'long', day: 'numeric' })}
                </DateText>
                {expanded ? (
                    <ArrowDown height="1.4em" onClick={onExpandClick} />
                ) : (
                    <ArrowUp height="1.4em" onClick={onExpandClick} />
                )}
            </Header>
            {expanded ? (
                <SingleDayCalendar
                    columns={props.columns}
                    events={props.events}
                    onSelectSlot={onSelectSlot}
                    onSelectEvent={onSelectEvent}
                    selectable={keycloak.authenticated}
                    step={15}
                    min={min}
                    max={max}
                    date={props.date}
                />
            ) : (
                <Agenda columns={props.columns} events={props.events} />
            )}
        </Wrapper>
    );
};
