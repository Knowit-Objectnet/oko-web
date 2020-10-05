import { Request } from '../src/types';

export const mockApiRequests: Array<Request> = [
    {
        pickup: {
            id: 1,
            startDateTime: '2020-08-05T07:47:00Z',
            endDateTime: '2020-08-05T07:55:00Z',
            description: '',
            station: {
                id: 1,
                name: 'Haraldrud',
                hours: {
                    MONDAY: ['08:00:00Z', '20:00:00Z'],
                    TUESDAY: ['08:00:00Z', '20:00:00Z'],
                    WEDNESDAY: ['08:00:00Z', '20:00:00Z'],
                    THURSDAY: ['08:00:00Z', '20:00:00Z'],
                    FRIDAY: ['10:00:00Z', '18:00:00Z'],
                },
            },
            chosenPartner: {
                id: 3,
                name: 'Fretex',
                description: 'Fretex driver med gjenbruk',
                phone: '004712345678',
                email: 'example@example.com',
            },
        },
        partner: {
            id: 3,
            name: 'Fretex',
            description: 'Fretex driver med gjenbruk',
            phone: '004712345678',
            email: 'example@example.com',
        },
    },
    {
        pickup: {
            id: 1,
            startDateTime: '2020-08-05T07:47:00Z',
            endDateTime: '2020-08-05T07:55:00Z',
            description: '',
            station: {
                id: 1,
                name: 'Haraldrud',
                hours: {
                    MONDAY: ['08:00:00Z', '20:00:00Z'],
                    TUESDAY: ['08:00:00Z', '20:00:00Z'],
                    WEDNESDAY: ['08:00:00Z', '20:00:00Z'],
                    THURSDAY: ['08:00:00Z', '20:00:00Z'],
                    FRIDAY: ['10:00:00Z', '18:00:00Z'],
                },
            },
            chosenPartner: {
                id: 3,
                name: 'Fretex',
                description: 'Fretex driver med gjenbruk',
                phone: '004712345678',
                email: 'example@example.com',
            },
        },
        partner: {
            id: 4,
            name: 'Maritastiftelsen',
            description: 'Maritastiftelsen driver også med gjenbruk',
            phone: '004712345678',
            email: 'example@example.com',
        },
    },
    {
        pickup: {
            id: 1,
            startDateTime: '2020-08-05T07:47:00Z',
            endDateTime: '2020-08-05T07:55:00Z',
            description: '',
            station: {
                id: 1,
                name: 'Haraldrud',
                hours: {
                    MONDAY: ['08:00:00Z', '20:00:00Z'],
                    TUESDAY: ['08:00:00Z', '20:00:00Z'],
                    WEDNESDAY: ['08:00:00Z', '20:00:00Z'],
                    THURSDAY: ['08:00:00Z', '20:00:00Z'],
                    FRIDAY: ['10:00:00Z', '18:00:00Z'],
                },
            },
            chosenPartner: {
                id: 3,
                name: 'Fretex',
                description: 'Fretex driver med gjenbruk',
                phone: '004712345678',
                email: 'example@example.com',
            },
        },
        partner: {
            id: 7,
            name: 'Jobben',
            description: 'Tro det eller ei; Jobben driver med gjenbruk.',
            phone: '004712345679',
            email: 'example@example.com',
        },
    },
    {
        pickup: {
            id: 17,
            startDateTime: '2020-08-13T09:30:00Z',
            endDateTime: '2020-08-13T11:00:00Z',
            description: '',
            station: {
                id: 3,
                name: 'Smestad',
                hours: {
                    MONDAY: ['10:00:00Z', '20:00:00Z'],
                    TUESDAY: ['10:00:00Z', '20:00:00Z'],
                    WEDNESDAY: ['10:00:00Z', '20:00:00Z'],
                    THURSDAY: ['10:00:00Z', '20:00:00Z'],
                    FRIDAY: ['10:00:00Z', '20:00:00Z'],
                },
            },
            chosenPartner: null,
        },
        partner: {
            id: 3,
            name: 'Fretex',
            description: 'Fretex driver med gjenbruk',
            phone: '004712345678',
            email: 'example@example.com',
        },
    },
];