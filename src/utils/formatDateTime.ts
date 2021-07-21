import { format, formatRelative, intervalToDuration } from 'date-fns';
import { differenceInCalendarDays } from 'date-fns/esm';
import { nb } from 'date-fns/locale';

export const formatDate = (date: Date): string => format(date, 'd. MMM yyyy', { locale: nb });
export const formatTime = (date: Date): string => format(date, 'HH:mm', { locale: nb });
export const formatDateTime = (date: Date, requireTime = true): string => {
    if (requireTime) {
        const durationFromNow = differenceInCalendarDays(date, new Date());
        const isLongerThan6Days = Math.abs(durationFromNow) > 6;
        const appendString = isLongerThan6Days ? ' kl. ' + formatTime(date) : '';
        return formatRelative(date, Date.now(), { locale: nb, weekStartsOn: 1 }) + appendString;
    }

    return formatRelative(date, Date.now(), { locale: nb, weekStartsOn: 1 });
};

export const formatDateRelative = (date: Date): string => {
    const durationFromNow = differenceInCalendarDays(date, new Date());
    const isLongerThan6Days = Math.abs(durationFromNow) > 6;
    const isLongerThan1Day = Math.abs(durationFromNow) > 1;
    if (!isLongerThan1Day) {
        return (
            formatRelative(date, Date.now(), { locale: nb, weekStartsOn: 1 }).split(' ', 2)[0] +
            ' ' +
            formatRelative(date, Date.now(), { locale: nb, weekStartsOn: 1 }).split(' ', 2)[1]
        );
    } else if (!isLongerThan6Days) {
        return formatRelative(date, Date.now(), { locale: nb, weekStartsOn: 1 }).split(' ', 1)[0];
    } else {
        return formatRelative(date, Date.now(), { locale: nb, weekStartsOn: 1 });
    }
};
