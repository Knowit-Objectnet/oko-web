import { format, formatISO } from 'date-fns';
import { ApiHenting } from '../services/henting/HentingService';

//TODO: This is done to circumvent issues regarding daylight saving. This might need a more robust solution.
// It effectively makes it so Date fields are read as strings, with no regards to time zones.
export const parseISOIgnoreTimezone = (dateString: string): Date => {
    const date = getDateStringFromISOString(dateString);
    const time = getTimeStringFromISOString(dateString).split(':');
    const hours: number = parseInt(time[0]);
    const minutes: number = parseInt(time[1]);

    const myDate = new Date(date);
    myDate.setHours(hours);
    myDate.setMinutes(minutes);

    return myDate;
};

const formatISODate = (date: Date): string => formatISO(date, { representation: 'date' });
const getTimeString = (date: Date): string => format(date, 'HH:mm');

export const mergeDateWithTimeToString = (date: Date, time: Date): string =>
    `${formatISODate(date)}T${getTimeString(time)}Z`;

export const dateTimeToStringIgnoreTimezone = (dateTime: Date): string =>
    `${formatISODate(dateTime)}T${getTimeString(dateTime)}Z`;

export const getDateStringFromISOString = (ISOdate: string): string => ISOdate.slice(0, 10);
export const getTimeStringFromISOString = (ISOdate: string): string => ISOdate.slice(11, 16);

export const hentingStarted = (henting: ApiHenting | undefined): boolean => {
    const today = new Date();
    if (new Date(henting?.startTidspunkt || '') > today) return false;
    return true;
};
