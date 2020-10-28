import * as React from 'react';
import { EventInfo } from '../../../types';
import { ListGroup } from './ListGroup';
import { Colors } from '../../../theme';

interface ListViewProps {
    date: Date;
    dayAndEvents: Array<[Date, Array<EventInfo>]>;
    sorting: (events: Array<EventInfo>) => Map<string, Array<EventInfo>>;
    specificColor?: Colors;
}

/*
 * Agenda list view component
 */
export const ListView: React.FC<ListViewProps> = (props) => (
    <>
        {props.dayAndEvents.map((dayAndEvent, i) => (
            <ListGroup
                key={'day' + i}
                events={dayAndEvent[1]}
                sorting={props.sorting}
                date={dayAndEvent[0]}
                specificColor={props.specificColor}
            />
        ))}
    </>
);
