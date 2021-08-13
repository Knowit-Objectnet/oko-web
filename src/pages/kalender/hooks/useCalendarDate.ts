import { formatISO, isValid, parseISO } from 'date-fns';
import { useQueryStringKey } from 'use-route-as-state';

const parseDate = (date?: string) => {
    const parsedDate = parseISO(date ?? '');
    return isValid(parsedDate) ? parsedDate : new Date();
};

export const formatDate = (date: Date): string => formatISO(date, { representation: 'date' });

export interface CalendarDateState {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

export const useCalendarDate = (): CalendarDateState => {
    // Getting "dato" value from URL query, if present
    const [queryDate, setQueryDate] = useQueryStringKey('dato');

    const date = parseDate(queryDate);

    const setDate = (date: Date) => {
        setQueryDate(formatDate(date));
    };

    return { selectedDate: date, setSelectedDate: setDate };
};
