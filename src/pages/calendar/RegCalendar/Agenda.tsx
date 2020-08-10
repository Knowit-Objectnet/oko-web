import * as React from 'react';
import styled from 'styled-components';
import { Colors, EventInfo } from '../../../types';

const Table = styled.table`
    table-layout: fixed;
    width: 100%;
`;

const TH = styled.th`
    position: sticky;
    top: 0;
    z-index: 20;
    background-color: ${Colors.LightBlue};
`;

interface TDProps {
    isEmpty: boolean;
}

const TD = styled.td<TDProps>`
    background-color: ${(props) => (props.isEmpty ? Colors.White : Colors.LightBeige)};
    border: ${(props) => props.isEmpty && `2px solid ${Colors.LightBeige}`};
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Cell = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Time = styled.div`
    margin-right: 10px;
    width: fit-content;
`;

interface AgendaProps {
    columns: Array<string>;
    events: Array<Array<EventInfo>>;
}

/*
 * Agenda component for the REG calendar
 */
export const Agenda: React.FC<AgendaProps> = (props) => {
    // Sort the events by it's start time
    props.events.forEach((arr) => arr.sort((a, b) => a.start.getTime() - b.start.getTime()));

    // Find the length of the column with the most events
    const maxLength = Math.max(...props.events.map((eventArray) => eventArray.length), 0);

    // Function to get nice time strongs on the form HH:mm - HH:mm
    const getTimeString = (start: Date, end: Date) => {
        const startString =
            start.getHours().toString().padStart(2, '0') + ':' + start.getMinutes().toString().padStart(2, '0');
        const endString =
            end.getHours().toString().padStart(2, '0') + ':' + end.getMinutes().toString().padStart(2, '0');

        return startString + ' - ' + endString;
    };

    return (
        <Table>
            <thead>
                <tr>
                    {props.columns.map((column) => (
                        <TH key={'Header:' + column}>{column}</TH>
                    ))}
                </tr>
            </thead>
            <tbody>
                {[...Array(maxLength)].map((_, i) => {
                    return (
                        <tr key={'Row' + i}>
                            {props.columns.map((column, j) => {
                                if (j >= props.events.length) {
                                    return <TD isEmpty={true} key={column + j}></TD>;
                                }

                                return (
                                    <TD isEmpty={props.events[j].length <= i} key={column + j}>
                                        {props.events[j].length > i && (
                                            <Cell>
                                                <Time>
                                                    {getTimeString(props.events[j][i].start, props.events[j][i].end)}
                                                </Time>
                                                <span>{props.events[j][i].title}</span>
                                            </Cell>
                                        )}
                                    </TD>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};
