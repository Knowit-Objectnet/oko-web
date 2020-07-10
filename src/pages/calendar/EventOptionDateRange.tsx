import * as React from 'react';
import { Clock } from '@styled-icons/fa-regular/Clock';
import { EventOption } from './EventOption';
import styled from 'styled-components';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { Colors } from '../../types';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
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
    dateRange: [Date, Date];
    timeRange: [Date, Date];
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
    const date = new Date();
    const minTime = '07:00:00';
    const maxTime = '20:00:00';

    const onTimeRangeChange = (range: [Date, Date]) => {
        props.onTimeRangeChange(range);
    };

    const onDateRangeChange = (range: [Date, Date]) => {
        props.onDateRangeChange(range);
    };

    const onRecurringChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();
        const value = e.currentTarget.value;
        if (value !== 'None' && value !== 'Daily' && value !== 'Weekly') return;
        props.onRecurringChange(value);
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
                    <Label>
                        <Select value={props.recurring} onChange={onRecurringChange}>
                            <option value="None">Gjentas ikke</option>
                            <option value="Daily">Daglig</option>
                            <option value="Weekly">Ukentlig</option>
                        </Select>
                    </Label>
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
                    <DateTimePickersWrapper>
                        <Span>Velg periode</Span>
                        <StyledDateRangePicker clearIcon={null} onChange={onDateRangeChange} value={props.dateRange} />
                    </DateTimePickersWrapper>
                </Wrapper>
            ) : (
                `
                    ${props.dateRange[0].toLocaleString('no-NB', { month: 'long', day: 'numeric', year: 'numeric' })},
                    ${props.timeRange[0].getHours()}:${props.timeRange[0].getMinutes()} - 
                    ${props.timeRange[1].getHours()}:${props.timeRange[1].getMinutes()}
                `
            )}
        </EventOption>
    );
};
