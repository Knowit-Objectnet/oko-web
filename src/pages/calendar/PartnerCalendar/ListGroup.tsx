import * as React from 'react';
import styled from 'styled-components';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import { EventInfo } from '../../../types';
import { ListItem } from './ListItem';
import ArrowDown from '../../../assets/ArrowDown.svg';
import ArrowUp from '../../../assets/ArrowUp.svg';

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

const Items = styled.div``;

interface ListGroupProps {
    date: Date;
    events: Array<EventInfo>;
}

export const ListGroup: React.FC<ListGroupProps> = (props) => {
    const locationSortedEvents = new Map<string, Array<EventInfo>>();
    props.events.forEach((event) => {
        if (event.resource?.location) {
            if (locationSortedEvents.has(event.resource.location.name)) {
                const _events = locationSortedEvents.get(event.resource.location.name);
                if (_events) {
                    _events.push(event);
                }
            } else {
                locationSortedEvents.set(event.resource.location.name, [event]);
            }
        }
    });

    return (
        <Wrapper>
            <Header>
                <DateText>
                    {props.date.toLocaleString('nb-NO', { weekday: 'long', month: 'long', day: 'numeric' })}
                </DateText>
            </Header>
            <Items>
                {[...locationSortedEvents.keys()].map((location) => {
                    const _events = locationSortedEvents.get(location);
                    return (
                        <ListItem key={location} date={props.date} title={location} events={_events ? _events : []} />
                    );
                })}
            </Items>
        </Wrapper>
    );
};
