import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Agenda } from './Agenda';
import { SingleDayCalendar } from '../../../../components/_deprecated/calendar/SingleDayCalendar';
import { EventInfo, SlotInfo } from '../../../../services/_deprecated/types';
import ArrowUp from '../../../../assets/ArrowUp.svg';
import ArrowDown from '../../../../assets/ArrowDown.svg';
import { useStasjoner } from '../../../../services/stasjon/useStasjoner';

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
    // State for handling expansion of the agenda/calendar
    const [expanded, setExpanded] = useState(false);

    // const { data: stations } = useStations();
    const { data: stasjoner } = useStasjoner();
    const stationNames = (stasjoner ?? []).map((stasjon) => stasjon.navn);
    const eventsByStation = stationNames.map((stationName) =>
        //TODO: Currently no equivalent to EventInfo planned, so this mapping won't work.
        props.events.filter((event) => event.resource.station.name === stationName),
    );

    const handleSelectEvent = (event: EventInfo) => {
        props.onSelectEvent(event);
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
                    onSelectEvent={handleSelectEvent}
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
