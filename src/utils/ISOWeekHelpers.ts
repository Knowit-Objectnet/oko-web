import { DateRange } from 'react-big-calendar';
import { addWeeks, endOfISOWeek, endOfMonth, isBefore, startOfISOWeek, startOfMonth } from 'date-fns';

export const getSingleISOWeek = (date: Date): DateRange => ({
    start: startOfISOWeek(date),
    end: endOfISOWeek(date),
});

export const getAllISOWeeksInMonth = (date: Date): Array<DateRange> => {
    const startOfFirstWeekInMonth = startOfISOWeek(startOfMonth(date));
    const endOfLastWeekInMonth = endOfISOWeek(endOfMonth(date));

    const weeks: Array<DateRange> = [];
    let startOfCurrentWeek = startOfFirstWeekInMonth;

    while (isBefore(startOfCurrentWeek, endOfLastWeekInMonth)) {
        weeks.push(getSingleISOWeek(startOfCurrentWeek));
        startOfCurrentWeek = addWeeks(startOfCurrentWeek, 1);
    }

    return weeks;
};
