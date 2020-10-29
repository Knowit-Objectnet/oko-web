import * as React from 'react';
import { EventInfo } from '../../../types';
import { createNDaysFromDate } from '../../../utils/createNDaysFromDate';
import isSameDay from 'date-fns/isSameDay';
import groupBy from 'lodash/groupBy';
import { Colors } from '../../../theme';
import { ListItem } from './ListItem';
import styled from 'styled-components';
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
    groupingFn: (event: EventInfo) => string;
    numberOfDays: number;
}

/*
 * Agenda list view component
 */
export const ListView: React.FC<ListViewProps> = (props) => {
    // Get all Oslo colors excpet black and white
    const colors = Object.values(Colors).filter((color) => color !== Colors.Black && color !== Colors.White);

    const daysToShow: Array<Date> = createNDaysFromDate(props.fromDate, props.numberOfDays);

    const getListItemsForDate = (date: Date) => {
        const eventsForDate = props.events.filter((event) => isSameDay(event.start, date));
        const groupedEvents = groupBy(eventsForDate, props.groupingFn);
        return Object.entries(groupedEvents).map(([label, events], i) => (
            <ListItem
                key={label}
                date={date}
                title={label}
                events={events ?? []}
                color={colors[i % (colors.length - 1)]}
            />
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
