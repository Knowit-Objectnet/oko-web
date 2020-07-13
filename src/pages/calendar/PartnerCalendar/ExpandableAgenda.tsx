import * as React from 'react';
import styled from 'styled-components';
import { WorkingWeekCalendar } from '../../../sharedComponents/Calendar/WorkingWeeekCalendar';
import { ListView } from './ListView';
import { EventInfo } from '../../../types';

const Wrapper = styled.div``;

interface ExpandableAgendaProps {
    date: Date;
    isToggled: boolean;
    events: Array<EventInfo>;
}

export const ExpandableAgenda: React.FC<ExpandableAgendaProps> = (props) => {
    const date = new Date(props.date);
    const min = new Date(date.setHours(7, 0, 0, 0));
    const max = new Date(date.setHours(20, 0, 0, 0));

    return (
        <Wrapper>
            {props.isToggled ? (
                <WorkingWeekCalendar date={props.date} min={min} max={max} />
            ) : (
                <ListView date={props.date} events={props.events} />
            )}
        </Wrapper>
    );
};
