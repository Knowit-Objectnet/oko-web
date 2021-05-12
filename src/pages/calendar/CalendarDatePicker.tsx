import * as React from 'react';
import { useCalendarState } from './CalendarProvider';
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';

export const CalendarDatePicker: React.FC = () => {
    const { selectedDate, setSelectedDate } = useCalendarState();

    const handleDateChange = (date: Date | Date[]) => {
        if (Array.isArray(date)) {
            date = date[0];
        }
        setSelectedDate(date);
    };

    return <DayPicker onDayClick={handleDateChange} selectedDays={selectedDate} showOutsideDays />;
};
