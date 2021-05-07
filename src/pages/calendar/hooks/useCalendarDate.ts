import { formatISO, parseISO } from 'date-fns';
import { useQueryStringKey } from 'use-route-as-state';

export const useCalendarDate = (): [Date, (date: Date) => void] => {
    const [queryDate, setQueryDate] = useQueryStringKey('dato');

    // TODO: handle invalid date format
    const date: Date = queryDate ? parseISO(queryDate) : new Date();

    const setDate = (date: Date) => {
        const newDate = formatISO(date, { representation: 'date' });
        setQueryDate(newDate);
    };

    return [date, setDate];
};
