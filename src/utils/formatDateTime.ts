import { differenceInCalendarDays, format, formatRelative } from 'date-fns';
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
