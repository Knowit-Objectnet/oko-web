import * as React from 'react';
import styled from 'styled-components';
import { Colors, EventInfo } from '../../types';

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

const TD = styled.td`
    background-color: ${Colors.LightBeige};
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

export const Agenda: React.FC<AgendaProps> = (props) => {
    props.events.forEach((arr) => arr.sort((a, b) => a.start.getTime() - b.start.getTime()));

    const maxLength = Math.max(...props.events.map((eventArray) => eventArray.length));

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
                                    return <TD key={column + j}></TD>;
                                }

                                return (
                                    <TD key={column + j}>
                                        {props.events[j].length < i ? null : (
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
