import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Agenda } from './Agenda/Agenda';
import { SingleDayCalendar } from './Calendar/SingleDayCalendar';
import { useKeycloak } from '@react-keycloak/web';
import { EventInfo, Roles, SlotInfo } from '../types';
import ArrowUp from '../assets/ArrowUp.svg';
import ArrowDown from '../assets/ArrowDown.svg';

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

export const ExpandableAgenda: React.FC<ExpandableAgendaProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    const [expanded, setExpanded] = useState(false);

    const setDate = (date: Date) => {
        return date.setFullYear(props.date.getFullYear(), props.date.getMonth(), props.date.getDate());
    };

    // Function that handles an event click in the calendar. It displays the Event in a modal
    const onSelectEvent = (event: EventInfo) => {
        const eventProps: EventInfo = event as EventInfo;
        props.onSelectEvent(eventProps);
    };

    // Function that handles time range selection in the calendar
    // It displays either a new event, or extra event depending on user role.
    // TODO: Make it show component depending on user role
    const onSelectSlot = (slotInfo: SlotInfo) => {
        // If the start date is less than now then don't show the popup modal
        const nowTime = new Date();
        setDate(nowTime);
        if (slotInfo.start < nowTime) {
            return;
        }

        // Create max and min times on the slotInfo date
        const minTime = new Date(slotInfo.start.setHours(7, 0));
        const maxTime = new Date(slotInfo.start.setHours(20, 0));

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

    const onSelecting = (range: { start?: Date; end?: Date }) => {
        const nowTime = new Date();
        setDate(nowTime);

        // If the startDate-time of the select is less than now then disable select
        if (!range.start || range.start < nowTime) {
            return false;
        } else {
            return true;
        }
    };

    const onExpandClick = () => {
        setExpanded(!expanded);
    };

    const min = new Date(props.date.setHours(7, 0, 0, 0));
    const max = new Date(props.date.setHours(20, 0, 0, 0));

    return (
        <Wrapper>
            <Header>
                <DateText>
                    {props.date.toLocaleString('nb-NO', { weekday: 'long', month: 'long', day: 'numeric' })}
                </DateText>
                {expanded ? (
                    <ArrowDown height="1em" onClick={onExpandClick} />
                ) : (
                    <ArrowUp height="1em" onClick={onExpandClick} />
                )}
            </Header>
            {expanded ? (
                <SingleDayCalendar
                    columns={props.columns}
                    events={props.events}
                    onSelectSlot={onSelectSlot}
                    onSelecting={onSelecting}
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
