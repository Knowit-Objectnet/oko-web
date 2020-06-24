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
    isRecurringEnabled: boolean;
    isRecurring?: boolean;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EventOptionDateRange: React.FC<EventOptionDateRangeProps> = (props) => {
    const DateToString = (date: Date): string => {
        let dateString = date.getFullYear() + '-';
        dateString += date.getMonth().toString().padStart(2, '0') + '-';
        dateString += date.getDate().toString().padStart(2, '0') + 'T';
        dateString += date.getHours().toString().padStart(2, '0') + ':';
        dateString += date.getMinutes().toString().padStart(2, '0');
        return dateString;
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
                    {props.isRecurringEnabled ? (
                        <Label>
                            FAST OPPDRAG
                            <input
                                type="checkbox"
                                name="recurring"
                                checked={props.isRecurring}
                                onChange={props.onChange}
                            />
                        </Label>
                    ) : null}
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
