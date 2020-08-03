import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../types';
import isSameDay from 'date-fns/isSameDay';

const Group = styled.div`
    min-height: 70px;
    display: flex;
    flex-flow: column nowrap;
    border-bottom: solid 1px transparent;
    position: sticky;
    top: 0;
    z-index: 20;
    background-color: ${Colors.White};
`;

const Slot = styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 5px 0px 0px;
`;

interface DateTextProps {
    isToday: boolean;
    isSingleDigit: boolean;
}

const DateText = styled.div<DateTextProps>`
    font-size: x-large;
    border-radius: 50%;
    padding: ${(props) => (props.isSingleDigit ? '5px 13px' : '5px')};
    color: ${(props) => (props.isToday ? Colors.White : Colors.Black)};
    background-color: ${(props) => (props.isToday ? Colors.DarkBlue : null)};
`;

interface WorkingWeekCalendarTitleProps {
    title?: string;
    date: Date;
}

/*
 * Custom title component for a column in the workign week calendar
 */
export const WorkingWeekCalendarTitle: React.FC<WorkingWeekCalendarTitleProps> = (props) => (
    <Group>
        <Slot>
            <div>
                {props.date.toLocaleString('no-NB', { weekday: 'short' }).slice(0, 1).toUpperCase() +
                    props.date.toLocaleString('no-NB', { weekday: 'short' }).slice(1)}
            </div>
            <DateText isToday={isSameDay(new Date(), props.date)} isSingleDigit={props.date.getDate() < 10}>
                {props.date.getDate()}
            </DateText>
        </Slot>
    </Group>
);
