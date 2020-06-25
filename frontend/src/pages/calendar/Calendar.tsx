import * as React from 'react';
import styled from 'styled-components';
import { Notifications } from './Notifications';
import { ChangeLog } from './ChangeLog';
import { WeekCalendar } from './WeekCalendar';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
`;

const Module = styled.div`
    display: flex;
    flex-direction: column;
`;

const ModuleCalendar = styled(Module)`
    flex: 1;
    overflow: auto;
`;

/**
 * The page component for the calendar view
 */
export const CalendarPage: React.FC<null> = () => (
    <Wrapper>
        <Module>
            <h3>Varslinger</h3>
            <Notifications />
        </Module>
        <ModuleCalendar>
            <h3>Kalender</h3>
            <WeekCalendar />
        </ModuleCalendar>
        <Module>
            <h3>Endringslogg</h3>
            <ChangeLog />
        </Module>
    </Wrapper>
);
