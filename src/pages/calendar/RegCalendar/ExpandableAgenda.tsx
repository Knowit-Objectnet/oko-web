import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Agenda } from './Agenda';
import { SingleDayCalendar } from '../../../sharedComponents/Calendar/SingleDayCalendar';
import { useKeycloak } from '@react-keycloak/web';
import { EventInfo, SlotInfo } from '../../../types';
import ArrowUp from '../../../assets/ArrowUp.svg';
import ArrowDown from '../../../assets/ArrowDown.svg';
import { useStations } from '../../../api/hooks/useStations';

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

interface Props {
    date: Date;
    events: Array<EventInfo>;
    onSelectSlot: (slot: SlotInfo) => void;
    onSelectEvent: (event: EventInfo) => void;
}

/*
 * Agenda component that expands into a week calendar
 */
export const ExpandableAgenda: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();

    // State for handling expansion of the agenda/calendar
    const [expanded, setExpanded] = useState(false);

    const { data: stations } = useStations();
    const stationNames = (stations ?? []).map((station) => station.name);
    const eventsByStation = stationNames.map((stationName) =>
        props.events.filter((event) => event.resource.station.name === stationName),
    );

    const handleSelectEvent = (event: EventInfo) => {
        props.onSelectEvent(event);
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
                    <ArrowUp height="1.4em" onClick={onExpandClick} />
                ) : (
                    <ArrowDown height="1.4em" onClick={onExpandClick} />
                )}
            </Header>
            {expanded ? (
                <SingleDayCalendar
                    columns={stationNames}
                    events={eventsByStation}
                    onSelectSlot={onSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    selectable={keycloak.authenticated}
                    step={15}
                    min={min}
                    max={max}
                    date={props.date}
                />
            ) : (
                <Agenda columns={stationNames} events={eventsByStation} />
            )}
        </Wrapper>
    );
};
