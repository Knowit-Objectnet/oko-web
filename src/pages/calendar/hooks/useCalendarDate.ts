import { formatISO, isValid, parseISO } from 'date-fns';
import { useQueryStringKey } from 'use-route-as-state';

const parseDate = (date?: string) => {
    const parsedDate = parseISO(date ?? '');
    return isValid(parsedDate) ? parsedDate : new Date();
};

export const useCalendarDate = (): [Date, (date: Date) => void] => {
    const [queryDate, setQueryDate] = useQueryStringKey('dato');

    const date = parseDate(queryDate);

    const setDate = (date: Date) => {
        const newDate = formatISO(date, { representation: 'date' });
        setQueryDate(newDate);
    };

    return [date, setDate];
};
