import { ApiWithdrawal } from "../src/types";
import add from 'date-fns/add';

const now = new Date();
now.setHours(10, 0, 0, 0);
const futureStart = add(now, { days: 1 });
const futureEnd = add(now, { days: 1, hours: 1 });

export const mockWithdrawals: Array<ApiWithdrawal> = [
    {
        reportId: 1,
        partnerId: 1,
        eventId: 1,
        weight: 200,
        startDateTime: '2020-09-23T10:00:00.000Z',
        endDateTime: '2020-09-23T11:00:00.000Z',
        station: {
            id: 1,
            name: 'haraldrud',
            hours: {
                MONDAY: ['07:00:00Z', '20:00:00Z'],
                TUESDAY: ['07:00:00Z', '20:00:00Z'],
                WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                THURSDAY: ['07:00:00Z', '20:00:00Z'],
                FRIDAY: ['07:00:00Z', '20:00:00Z'],
            },
        },
        reportedDateTime: null,
    },
    {
        reportId: 2,
        partnerId: 1,
        eventId: 2,
        weight: null,
        startDateTime: '2020-09-23T09:00:00.000Z',
        endDateTime: '2020-09-23T10:00:00.000Z',
        station: {
            id: 1,
            name: 'haraldrud',
            hours: {
                MONDAY: ['07:00:00Z', '20:00:00Z'],
                TUESDAY: ['07:00:00Z', '20:00:00Z'],
                WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                THURSDAY: ['07:00:00Z', '20:00:00Z'],
                FRIDAY: ['07:00:00Z', '20:00:00Z'],
            },
        },
        reportedDateTime: null,
    },
    {
        reportId: 3,
        partnerId: 1,
        eventId: 3,
        weight: null,
        startDateTime: '2020-09-24T13:00:00.000Z',
        endDateTime: '2020-09-24T14:30:00.000Z',
        station: {
            id: 1,
            name: 'haraldrud',
            hours: {
                MONDAY: ['07:00:00Z', '20:00:00Z'],
                TUESDAY: ['07:00:00Z', '20:00:00Z'],
                WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                THURSDAY: ['07:00:00Z', '20:00:00Z'],
                FRIDAY: ['07:00:00Z', '20:00:00Z'],
            },
        },
        reportedDateTime: null,
    },
    {
        reportId: 4,
        partnerId: 1,
        eventId: 4,
        weight: 200,
        startDateTime: '2020-08-23T12:15:00.000Z',
        endDateTime: '2020-08-23T12:45:00.000Z',
        station: {
            id: 1,
            name: 'haraldrud',
            hours: {
                MONDAY: ['07:00:00Z', '20:00:00Z'],
                TUESDAY: ['07:00:00Z', '20:00:00Z'],
                WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                THURSDAY: ['07:00:00Z', '20:00:00Z'],
                FRIDAY: ['07:00:00Z', '20:00:00Z'],
            },
        },
        reportedDateTime: null,
    },
    {
        reportId: 5,
        partnerId: 1,
        eventId: 5,
        weight: null,
        startDateTime: futureStart.toISOString(),
        endDateTime: futureEnd.toISOString(),
        station: {
            id: 1,
            name: 'haraldrud',
            hours: {
                MONDAY: ['07:00:00Z', '20:00:00Z'],
                TUESDAY: ['07:00:00Z', '20:00:00Z'],
                WEDNESDAY: ['07:00:00Z', '20:00:00Z'],
                THURSDAY: ['07:00:00Z', '20:00:00Z'],
                FRIDAY: ['07:00:00Z', '20:00:00Z'],
            },
        },
        reportedDateTime: null,
    },
];