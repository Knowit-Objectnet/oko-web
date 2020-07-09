import * as React from 'react';
import { Clock } from '@styled-icons/fa-regular/Clock';
import { EventOption } from './EventOption';
import styled from 'styled-components';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import { Colors } from '../../types';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const DatePickersWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    &:not(:last-child) {
        margin-bottom: 25px;
    }
`;

const Label = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 25px;
`;

const Span = styled.span`
    width: 100%;
    margin-bottom: 5px;
`;

const Select = styled.select`
    width: 100%;
`;

const DaySelection = styled.div`
    display: flex;
`;

const Day = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    border-radius: 50%;
    border: 2px solid ${Colors.Blue};
    user-select: none;

    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const StyledTimeRangePicker = styled(TimeRangePicker)`
    width: 100%;

    & .react-timerange-picker__range-divider {
        flex: 1;
    }
`;

const StyledDateRangePicker = styled(DateRangePicker)`
    width: 100%;

    & .react-daterange-picker__range-divider {
        flex: 1;
    }
`;

interface EventOptionDateRangeProps {
    range?: [Date, Date];
    start: Date;
    end: Date;
    isRecurringEnabled: boolean;
    isRecurring?: boolean;
    isEditing: boolean;
    onStartDateChange: (date: Date) => void;
    onEndDateChange: (date: Date) => void;
    onRecurringChange?: () => void;
}

/**
 * Event option that allows the user to choose a start and end date for the event.
 */
export const EventOptionDateRange: React.FC<EventOptionDateRangeProps> = (props) => {
    // Date object to create new date objects
    const date = new Date();
    // Date object to get datetime of now
    const now = new Date();
    // Date object with today's date and the event's start hours and minutes
    const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        props.start.getHours(),
        props.start.getMinutes(),
    );
    // Date object with today's date and the event's end hours and minutes
    const endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        props.end.getHours(),
        props.end.getMinutes(),
    );

    // The allowed minimum time
    let startMinTime = new Date(date.setHours(7, 30));
    // If the event date is today and now is bigger than the minimum time then set the start's minimum time to now
    if (props.start.getDate() == now.getDate() && now > startMinTime) {
        // This is to make sure that you aren't allowed to select
        // F.ex. 12:30 if the time now is 12:30:30
        const _now = now.setMinutes(now.getMinutes() + 1);
        startMinTime = now;
    }
    // The allowed maximum time
    const endMaxTime = new Date(date.setHours(21, 0));
    // Set the event's end-time minimum to either the start of the event or the allowed minimum time
    const endMinTime = startTime < startMinTime ? startMinTime : startTime;
    // Set the event's start-time maximum to either the end of the event or the allowed maximum time
    const startMaxTime = endTime > endMaxTime ? endMaxTime : endTime;
    // Set the minimum date allowed to now/today
    const minDate = now;

    const onTimeRangeChange = (range: [Date, Date]) => {
        console.log(range);
    };

    const onDateRangeChange = (range: [Date, Date]) => {
        console.log(range);
    };

    return (
        <EventOption>
            {props.isEditing ? (
                <Wrapper>
                    <Label>
                        <Select>
                            <option>Gjentas ikke</option>
                            <option>Daglig</option>
                            <option>Ukentlig</option>
                        </Select>
                    </Label>
                    <Label>
                        <Span>Velg ukedag(er)</Span>
                        <DaySelection>
                            <Day>M</Day>
                            <Day>Ti</Day>
                            <Day>O</Day>
                            <Day>To</Day>
                            <Day>F</Day>
                        </DaySelection>
                    </Label>
                    <DatePickersWrapper>
                        <Span>Velg tidspunkt</Span>
                        <StyledTimeRangePicker
                            clearIcon={null}
                            onChange={onTimeRangeChange}
                            value={[new Date(), new Date()]}
                        />
                    </DatePickersWrapper>
                    <DatePickersWrapper>
                        <Span>Velg periode</Span>
                        <StyledDateRangePicker
                            clearIcon={null}
                            onChange={onDateRangeChange}
                            value={[new Date(), new Date()]}
                        />
                    </DatePickersWrapper>
                </Wrapper>
            ) : (
                `
                    ${props.start.toLocaleString('no-NB', { month: 'long', day: 'numeric', year: 'numeric' })},
                    ${props.start.getHours()}:${props.start.getMinutes()} - 
                    ${props.end.getHours()}:${props.end.getMinutes()}
                `
            )}
        </EventOption>
    );
};
