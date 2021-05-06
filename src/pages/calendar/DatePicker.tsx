import * as React from 'react';
import { Box } from '@chakra-ui/layout';
import { default as DateCalendar } from 'react-calendar';

interface Props {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

export const DatePicker: React.FC<Props> = ({ selectedDate, onDateChange }) => {
    const handleDateChange = (date: Date | Date[]) => {
        if (Array.isArray(date)) {
            date = date[0];
        }
        onDateChange(date);
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
