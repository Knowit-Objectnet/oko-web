import * as React from 'react';
import { useCalendar } from './CalendarProvider';
import { Box } from '@chakra-ui/layout';
import { default as DateCalendar } from 'react-calendar';

export const DatePicker: React.FC = () => {
    const { state, dispatch } = useCalendar();

    const handleDateChange = (date: Date | Date[]) => {
        if (Array.isArray(date)) {
            date = date[0];
        }
        dispatch({ type: 'SET_DATE', date });
    };

    return (
        <Box
            css={{
                '& > .react-calendar': {
                    border: 'none',
                },
            }}
        >
            <DateCalendar locale="nb-NO" value={state.selectedDate} onChange={handleDateChange} />
        </Box>
    );
};
