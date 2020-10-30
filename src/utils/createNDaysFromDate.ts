import addDays from 'date-fns/addDays';

export const createNDaysFromDate = (initialDate: Date, numberOfDays: number): Array<Date> =>
    [...Array(numberOfDays).keys()].map((day) => addDays(initialDate, day));
