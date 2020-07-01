import * as React from 'react';
import { Clock } from '@styled-icons/fa-regular/Clock';
import { EventOption } from './EventOption';
import styled from 'styled-components';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import nb from 'date-fns/locale/nb';

const DatePickersWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
`;

const Divider = styled.span`
    margin: 0px 10px;
    font-weight: bolder;
    font-size: 1.5em;
`;

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
    onStartDateChange: (date: Date) => void;
    onEndDateChange: (date: Date) => void;
    onRecurringChange?: () => void;
}

/**
 * Event option that allows the user to choose a start and end date for the event.
 */
export const EventOptionDateRange: React.FC<EventOptionDateRangeProps> = (props) => {
    const date = new Date();
    const minTime = new Date(date.setHours(7, 30));
    const maxTime = new Date(date.setHours(21, 0));
    const minDate = date;

    registerLocale('nb', nb);
    setDefaultLocale('nb');

    const isWeekday = (date: Date) => {
        return date.getDay() !== 0 && date.getDay() !== 6;
    };

    const onStartChange = (date: Date | null, event: React.SyntheticEvent<any, Event> | undefined) => {
        if (date) {
            props.onStartDateChange(date);
            props.onEndDateChange(new Date(props.end.setDate(date.getDate())));
        }
    };

    const onEndChange = (date: Date | null, event: React.SyntheticEvent<any, Event> | undefined) => {
        if (date) {
            props.onEndDateChange(date);
            props.onStartDateChange(new Date(props.start.setDate(date.getDate())));
        }
    };

    const onRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        if (props.onRecurringChange) props.onRecurringChange();
    };

    return (
        <EventOption icon={Clock}>
            {props.isEditing ? (
                <>
                    <DatePickersWrapper>
                        <DatePicker
                            locale="nb"
                            showTimeSelect
                            timeIntervals={15}
                            minTime={minTime}
                            maxTime={props.end}
                            minDate={minDate}
                            filterDate={isWeekday}
                            timeFormat="HH:mm"
                            dateFormat="MMMM d, yyyy HH:mm"
                            timeCaption="Tid"
                            selected={props.start}
                            onChange={onStartChange}
                        />
                        <Divider>-</Divider>
                        <DatePicker
                            locale="nb"
                            showTimeSelect
                            timeIntervals={15}
                            minTime={props.start}
                            maxTime={maxTime}
                            minDate={minDate}
                            filterDate={isWeekday}
                            timeFormat="HH:mm"
                            dateFormat="MMMM d, yyyy HH:mm"
                            timeCaption="Tid"
                            selected={props.end}
                            onChange={onEndChange}
                        />
                    </DatePickersWrapper>
                    {props.isRecurringEnabled ? (
                        <Label>
                            FAST OPPDRAG
                            <input
                                type="checkbox"
                                name="recurring"
                                checked={props.isRecurring}
                                onChange={onRecurringChange}
                            />
                        </Label>
                    ) : null}
                </>
            ) : (
                `
                    ${props.start.toLocaleString('no-NB', {month: 'long', day: 'numeric', year: 'numeric'})},
                    ${props.start.getHours()}:${props.start.getMinutes()} - 
                    ${props.end.getHours()}:${props.end.getMinutes()}
                `
            )}
        </EventOption>
    );
};
