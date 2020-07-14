import * as React from 'react';
import styled from 'styled-components';
import { Colors, EventInfo } from '../../../types';
import { ListGroup } from './ListGroup';

const Wrapper = styled.div``;

interface ListViewProps {
    date: Date;
    dayAndEvents: Array<[Date, Array<EventInfo>]>;
    sorting: (events: Array<EventInfo>) => Map<string, Array<EventInfo>>;
    specificColor?: Colors;
}

export const ListView: React.FC<ListViewProps> = (props) => {
    return (
        <Wrapper>
            {props.dayAndEvents.map((dayAndEvent, i) => (
                <ListGroup
                    key={'day' + i}
                    events={dayAndEvent[1]}
                    sorting={props.sorting}
                    date={dayAndEvent[0]}
                    specificColor={props.specificColor}
                />
            ))}
        </Wrapper>
    );
};
