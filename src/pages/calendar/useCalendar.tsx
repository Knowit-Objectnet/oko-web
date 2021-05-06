import { useContext } from 'react';
import { CalendarContext } from './CalendarProvider';

export const useCalendar = (): CalendarContext => {
    const context = useContext(CalendarContext);
    if (context === undefined) {
        throw new Error('useCalendarState must be used within a CalendarProvider');
    }
    return context;
};
