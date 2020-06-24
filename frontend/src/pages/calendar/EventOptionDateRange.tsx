import * as React from 'react';
import { Clock } from '@styled-icons/fa-regular/Clock';
import { EventOption } from './EventOption';
import styled from 'styled-components';

const Label = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 10px;
    line-height: 12px;
    margin-left: 110px;
`;

interface EventOptionDateRangeProps {
    start: Date;
    end: Date;
    isRecurring: boolean;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EventOptionDateRange: React.FC<EventOptionDateRangeProps> = (props) => {
    const DateToString = (date: Date): string => {
        return date.toISOString().substr(0, 16);
    };

    return (
        <EventOption icon={Clock}>
            {props.isEditing ? (
                <>
                    <div>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={DateToString(props.start)}
                            onChange={props.onChange}
                            max={DateToString(props.end)}
                        />
                        {`  -  `}
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={DateToString(props.end)}
                            onChange={props.onChange}
                            min={DateToString(props.start)}
                        />
                    </div>
                    <Label>
                        FAST OPPDRAG
                        <input type="checkbox" name="recurring" checked={props.isRecurring} onChange={props.onChange} />
                    </Label>
                </>
            ) : (
                `
                    ${props.start.toLocaleString('no-NB', { month: 'long', day: 'numeric', year: 'numeric' })},
                    ${props.start.getHours()} - 
                    ${props.end.getHours()}
                `
            )}
        </EventOption>
    );
};
