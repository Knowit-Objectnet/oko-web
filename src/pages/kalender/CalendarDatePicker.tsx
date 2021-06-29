import * as React from 'react';
import { useCalendarState } from './CalendarProvider';
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';
import { Box } from '@chakra-ui/layout';

export const CalendarDatePicker: React.FC = () => {
    const { selectedDate, setSelectedDate } = useCalendarState();

    const handleDateChange = (date: Date | Date[]) => {
        if (Array.isArray(date)) {
            date = date[0];
        }
        setSelectedDate(date);
    };

    return (
        <Box
            sx={{
                '.DayPicker-Day--today': {
                    color: 'primary',
                },
                '.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)': {
                    backgroundColor: 'primary',
                },
            }}
        >
            <DayPicker onDayClick={handleDateChange} selectedDays={selectedDate} showOutsideDays firstDayOfWeek={1} />
        </Box>
    );
};
