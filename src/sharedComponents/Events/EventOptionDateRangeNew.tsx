import * as React from 'react';
import styled from 'styled-components';
import { DatePicker } from '../forms/DatePicker';
import { EventDaysSelect } from './EventDaysSelect';
import { EventTimeRange } from './EventTimeRange';
import { EventDateRange } from './EventDateRange';
import { ErrorMessage } from '../forms/ErrorMessage';
import { useFormContext } from 'react-hook-form';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const DatePickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TimePickerWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    &:not(:last-child) {
        margin-bottom: 10px;
    }
`;

const Label = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
`;

const Span = styled.span`
    width: 100%;
    margin-bottom: 5px;
`;

const Select = styled.select`
    width: 100%;
    height: 30px;
`;

interface EventOptionDateRangeProps {
    recurrenceEnabled: boolean;
    recurring: 'None' | 'Daily' | 'Weekly';
}

/**
 * Event option that allows the user to choose a start and end date for the event.
 */
export const EventOptionDateRangeNew: React.FC<EventOptionDateRangeProps> = (props) => {
    const { register } = useFormContext();

    return (
        <Wrapper>
            {props.recurrenceEnabled && (
                <Label>
                    <Select name="recurring" ref={register}>
                        <option value="None">Gjentas ikke</option>
                        <option value="Daily">Daglig</option>
                        <option value="Weekly">Ukentlig</option>
                    </Select>
                </Label>
            )}
            {props.recurring === 'Weekly' && <EventDaysSelect name="selectedDays" />}
            <TimePickerWrapper>
                <Span>Velg tidspunkt</Span>
                <EventTimeRange />
            </TimePickerWrapper>
            {props.recurring !== 'None' && (
                <TimePickerWrapper>
                    <Span>Velg periode</Span>
                    <EventDateRange />
                </TimePickerWrapper>
            )}
            {props.recurring === 'None' && (
                <DatePickerWrapper>
                    <DatePicker name="nonRecurringDate" />
                    <ErrorMessage name="nonRecurringDate" />
                </DatePickerWrapper>
            )}
        </Wrapper>
    );
};
