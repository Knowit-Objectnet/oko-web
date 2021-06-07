import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

export const localeDateFromISO = (dateString: string): Date => {
    const splitString = dateString.split('T');
    const splitTimeString = splitString[1].split(':');
    const hours: number = parseInt(splitTimeString[0]);
    const minutes: number = parseInt(splitTimeString[1]);

    const myDate = new Date(splitString[0]);
    myDate.setHours(hours);
    myDate.setMinutes(minutes);

    return myDate;
};

const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');

export const toISOLocalString = (date: Date): string => {
    return `${zeroPad(date.getFullYear(), 4)}-${zeroPad(date.getMonth() + 1, 2)}-${zeroPad(
        date.getDate(),
        2,
    )}T${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}:${zeroPad(date.getSeconds(), 2)}.${zeroPad(
        date.getMilliseconds(),
        3,
    )}Z`;
};

export const formatLocalTime = (date: string): string => format(localeDateFromISO(date), 'HH:mm', { locale: nb });
