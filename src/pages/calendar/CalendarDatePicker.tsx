import * as React from 'react';
import { Box } from '@chakra-ui/layout';
import { default as DateCalendar } from 'react-calendar';
import { useCalendarState } from './CalendarProvider';

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
            css={{
                '& > .react-calendar': {
                    border: 'none',
                },
            }}
        >
            <DateCalendar locale="nb-NO" value={selectedDate} onChange={handleDateChange} />
        </Box>
    );
};
