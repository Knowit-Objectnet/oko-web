import * as React from 'react';
import { EventOption } from './EventOption';
import styled from 'styled-components';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import DatePicker from 'react-date-picker';
import { useState } from 'react';
import { Colors } from '../../../types';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const DateTimePickersWrapper = styled.div`
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

interface DayProps {
    selected: boolean;
}

const Day = styled.div<DayProps>`
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
    background-color: ${(props) => (props.selected ? Colors.Blue : Colors.White)};
    user-select: none;

    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const StyledTimeRangePicker = styled(TimeRangePicker)`
    width: 100%;

    & .react-timerange-picker__range-divider {
        flex: auto;
    }
`;

const StyledDateRangePicker = styled(DateRangePicker)`
    width: 100%;

    & .react-daterange-picker__range-divider {
        flex: auto;
    }
`;

interface EventOptionDateRangeProps {
    dateRange: [Date, Date];
    timeRange: [Date, Date];
    recurrenceEnabled: boolean;
    recurring: 'None' | 'Daily' | 'Weekly';
    selectedDays: Array<number>;
    isEditing: boolean;
    onDateRangeChange: (range: [Date, Date]) => void;
    onTimeRangeChange: (range: [Date, Date]) => void;
    onRecurringChange: (value: 'None' | 'Daily' | 'Weekly') => void;
    onSelectedDaysChange: (num: Array<number>) => void;
}

/**
 * Event option that allows the user to choose a start and end date for the event.
 */
export const EventOptionDateRange: React.FC<EventOptionDateRangeProps> = (props) => {
    const [nonRecurringDate, setNonRecurringDate] = useState(new Date());
    const minTime = '07:00:00';
    const maxTime = '20:00:00';

    const onTimeRangeChange = (range: [string | Date, string | Date]) => {
        const date = new Date(nonRecurringDate);

        let start = range[0] instanceof Date ? range[0] : null;
        let end = range[1] instanceof Date ? range[1] : null;

        if (typeof range[0] == 'string') {
            const startStrings = range[0].split(':');
            start = new Date(date.setHours(parseInt(startStrings[0]), parseInt(startStrings[1])));
        }
        if (typeof range[1] == 'string') {
            const endStrings = range[1].split(':');
            end = new Date(date.setHours(parseInt(endStrings[0]), parseInt(endStrings[1])));
        }

        if (start && end) {
            props.onTimeRangeChange([start, end]);
        } else {
            throw new Error('Something went horribly wrong because of typescript');
        }
    };

    const onDateRangeChange = (range: [Date, Date]) => {
        const newTimeStart = new Date(props.timeRange[0]);
        const newTimeEnd = new Date(props.timeRange[1]);
        newTimeStart.setFullYear(range[0].getFullYear(), range[0].getMonth(), range[0].getDate());
        newTimeEnd.setFullYear(range[0].getFullYear(), range[0].getMonth(), range[0].getDate());
        props.onTimeRangeChange([newTimeStart, newTimeEnd]);
        props.onDateRangeChange(range);
    };

    const onRecurringChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();
        const value = e.currentTarget.value;
        if (value !== 'None' && value !== 'Daily' && value !== 'Weekly') return;
        props.onRecurringChange(value);
    };

    const onNonRecurringDateChange = (date: Date | Date[]) => {
        if (date instanceof Date) {
            const start = props.timeRange[0];
            const end = props.timeRange[1];
            start.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            end.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            setNonRecurringDate(date);
            props.onTimeRangeChange([start, end]);
        }
    };

    const onDayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.persist();
        const stringValue = e.currentTarget.dataset['index'];
        if (stringValue && parseInt(stringValue) > 0 && parseInt(stringValue) < 6) {
            if (props.selectedDays.includes(parseInt(stringValue))) {
                const newSelection = props.selectedDays.filter((val) => val !== parseInt(stringValue));
                props.onSelectedDaysChange(newSelection);
            } else {
                props.onSelectedDaysChange([...props.selectedDays, parseInt(stringValue)]);
            }
        }
    };

    return (
        <EventOption>
            {props.isEditing ? (
                <Wrapper>
                    {props.recurrenceEnabled ? (
                        <Label>
                            <Select value={props.recurring} onChange={onRecurringChange}>
                                <option value="None">Gjentas ikke</option>
                                <option value="Daily">Daglig</option>
                                <option value="Weekly">Ukentlig</option>
                            </Select>
                        </Label>
                    ) : null}
                    {props.recurring === 'Weekly' ? (
                        <Label>
                            <Span>Velg ukedag(er)</Span>
                            <DaySelection>
                                <Day data-index={1} selected={props.selectedDays.includes(1)} onClick={onDayClick}>
                                    M
                                </Day>
                                <Day data-index={2} selected={props.selectedDays.includes(2)} onClick={onDayClick}>
                                    Ti
                                </Day>
                                <Day data-index={3} selected={props.selectedDays.includes(3)} onClick={onDayClick}>
                                    O
                                </Day>
                                <Day data-index={4} selected={props.selectedDays.includes(4)} onClick={onDayClick}>
                                    To
                                </Day>
                                <Day data-index={5} selected={props.selectedDays.includes(5)} onClick={onDayClick}>
                                    F
                                </Day>
                            </DaySelection>
                        </Label>
                    ) : null}
                    <DateTimePickersWrapper>
                        <Span>Velg tidspunkt</Span>
                        <StyledTimeRangePicker
                            clearIcon={null}
                            format="HH:mm"
                            minTime={minTime}
                            maxTime={maxTime}
                            onChange={onTimeRangeChange}
                            value={props.timeRange}
                        />
                    </DateTimePickersWrapper>
                    {props.recurring !== 'None' ? (
                        <DateTimePickersWrapper>
                            <Span>Velg periode</Span>
                            <StyledDateRangePicker
                                clearIcon={null}
                                onChange={onDateRangeChange}
                                value={props.dateRange}
                            />
                        </DateTimePickersWrapper>
                    ) : null}
                    {props.recurring === 'None' ? (
                        <DatePicker onChange={onNonRecurringDateChange} value={nonRecurringDate} />
                    ) : null}
                </Wrapper>
            ) : (
                `
                    ${props.dateRange[0].toLocaleString('nb-NO', { month: 'long', day: 'numeric', year: 'numeric' })},
                    ${props.timeRange[0]
                        .getHours()
                        .toString()
                        .padStart(2, '0')}:${props.timeRange[0].getMinutes().toString().padStart(2, '0')} - 
                    ${props.timeRange[1]
                        .getHours()
                        .toString()
                        .padStart(2, '0')}:${props.timeRange[1].getMinutes().toString().padStart(2, '0')}
                `
            )}
        </EventOption>
    );
};
