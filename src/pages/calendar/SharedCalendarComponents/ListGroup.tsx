import * as React from 'react';
import styled from 'styled-components';
import { Colors, EventInfo } from '../../../types';
import { ListItem } from './ListItem';

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
    sorting: (events: Array<EventInfo>) => Map<string, Array<EventInfo>>;
    specificColor?: Colors;
}

export const ListGroup: React.FC<ListGroupProps> = (props) => {
    const sortedEvents = props.sorting(props.events);

    const colors = Object.values(Colors);

    return (
        <Wrapper>
            <Header>
                <DateText>
                    {props.date.toLocaleString('nb-NO', { weekday: 'long', month: 'long', day: 'numeric' })}
                </DateText>
            </Header>
            <Items>
                {[...sortedEvents.keys()].map((text, i) => {
                    const _events = sortedEvents.get(text);
                    return (
                        <ListItem
                            key={text}
                            date={props.date}
                            title={text}
                            events={_events ? _events : []}
                            color={props.specificColor ? props.specificColor : colors[i % (colors.length - 1)]}
                        />
                    );
                })}
            </Items>
        </Wrapper>
    );
};
