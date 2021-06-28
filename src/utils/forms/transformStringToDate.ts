import { isDate, isValid, parse } from 'date-fns';

export const PARSE_DATE_FORMAT = 'yyyy-MM-dd';

export const transformStringToDate = (value: unknown, originalValue: string): Date | null => {
    // If yup has successfully transformed user input to Date by itself
    if (isDate(value) && isValid(value)) {
        return value as Date;
    }
    // We try to parse and return the user input, otherwise null
    const parsed = parse(originalValue, PARSE_DATE_FORMAT, new Date());
    return isValid(parsed) ? parsed : null;
};
