import * as React from 'react';
import { EventInfo } from '../../../types';
import { createNDaysFromDate } from '../../../utils/createNDaysFromDate';
import isSameDay from 'date-fns/isSameDay';
import groupBy from 'lodash/groupBy';
import pickBy from 'lodash/pickBy';
import { ListItem } from './ListItem';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { AuthTokenParsed } from '../../../auth/useAuth';
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

interface ListViewProps {
    fromDate: Date;
    events: Array<EventInfo>;
    numberOfDays: number;
}

/*
 * Agenda list view component
 */
export const ListView: React.FC<ListViewProps> = (props) => {
    const { keycloak } = useKeycloak();

    const daysToShow: Array<Date> = createNDaysFromDate(props.fromDate, props.numberOfDays);

    const getListItemsForDate = (date: Date) => {
        const eventsForDate = props.events.filter((event) => isSameDay(event.start, date));
        const groupedEvents = groupBy(eventsForDate, (event): string => event.resource.station.name);
        const filteredAndGroupedEvents = pickBy(groupedEvents, (eventsInGroup) =>
            eventsInGroup.some(
                (event) => event.resource.partner.id === (keycloak.tokenParsed as AuthTokenParsed)?.GroupID,
            ),
        );
        return Object.entries(filteredAndGroupedEvents).map(([label, events]) => (
            <ListItem key={label} date={date} title={label} events={events} />
        ));
    };

    return (
        <>
            {daysToShow.map((date) => (
                <Wrapper key={date.toString()}>
                    <Header>
                        <DateText>
                            {date.toLocaleString('nb-NO', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </DateText>
                    </Header>
                    {getListItemsForDate(date)}
                </Wrapper>
            ))}
        </>
    );
};
