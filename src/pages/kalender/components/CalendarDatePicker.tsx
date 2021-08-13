import * as React from 'react';
import { useCalendarState } from '../CalendarProvider';
import DayPicker from 'react-day-picker';
import { Box } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import Calendar from '../../../assets/Calendar.svg';
import { CalendarDrawerWrapper } from './CalendarDrawerWrapper';

import 'react-day-picker/lib/style.css';

export const CalendarDatePicker: React.FC = () => {
    const { selectedDate, setSelectedDate } = useCalendarState();

    const handleDateChange = (date: Date | Date[]) => {
        if (Array.isArray(date)) {
            date = date[0];
        }
        setSelectedDate(date);
    };

    const months = {
        'nb-no': [
            'Januar',
            'Februar',
            'Mars',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Desember',
        ],
    };
    const weekdaysLong = {
        'nb-no': ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
    };
    const weekdaysShort = {
        'nb-no': ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'],
    };
    const firstDayOfWeek = {
        'nb-no': 1,
    };

    return (
        <CalendarDrawerWrapper
            triggerLabel="Velg dato"
            triggerIcon={<Icon as={Calendar} />}
            footerCloseButtonLabel="Sett dato"
        >
            <Box
                marginX="auto"
                width="min-content"
                sx={{
                    '.DayPicker-Month': {
                        margin: '0.25rem',
                    },
                    '.DayPicker-Day--today': {
                        color: 'primary',
                    },
                    '.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)': {
                        backgroundColor: 'primary',
                    },
                }}
            >
                <DayPicker
                    onDayClick={handleDateChange}
                    selectedDays={selectedDate}
                    showOutsideDays
                    firstDayOfWeek={firstDayOfWeek['nb-no']}
                    weekdaysShort={weekdaysShort['nb-no']}
                    weekdaysLong={weekdaysLong['nb-no']}
                    months={months['nb-no']}
                />
            </Box>
        </CalendarDrawerWrapper>
    );
};
