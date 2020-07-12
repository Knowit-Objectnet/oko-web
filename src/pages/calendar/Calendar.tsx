import * as React from 'react';
import styled from 'styled-components';
import { default as DateCalendar } from 'react-calendar';
import { WeekCalendar } from './WeekCalendar';
import { useState } from 'react';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 40px;
    box-sizing: border-box;
`;

const Module = styled.div`
    display: flex;
    flex-direction: column;
`;

const ModuleDateCalendar = styled.div`
    margin-right: 20px;

    & > .react-calendar {
        border: none;
    }
`;

const ModuleCalendar = styled(Module)`
    flex: 1;
    overflow: auto;
`;

/**
 * The page component for the calendar view
 */
export const CalendarPage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDatechange = (date: Date | Date[]) => {
        if (date instanceof Date) {
            setSelectedDate(date);
        }
    };

    return (
        <Wrapper>
            <ModuleDateCalendar>
                <DateCalendar locale="nb-NO" value={selectedDate} onChange={onDatechange} />
            </ModuleDateCalendar>
            <ModuleCalendar>
                <WeekCalendar date={selectedDate} />
            </ModuleCalendar>
        </Wrapper>
    );
};
