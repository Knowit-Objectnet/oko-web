import {ApiEvent, EventInfo} from "../src/types";

const d = new Date();
const start = new Date(d.setDate(d.getDate() - d.getDay() + (d.getDay() == 0 ? -6 : 1)));
const end = new Date(d.setDate(d.getDate() - d.getDay() + (d.getDay() == 0 ? -6 : 1)));
start.setHours(10);
end.setHours(12)

export const mockEvents: Array<EventInfo> = [
    {
        title: 'Test',
        start: start,
        end: end,
        resource: {
            eventId: 1,
            station: {
                id: 2,
                name: "Grønmo",
                hours: {
                    MONDAY: ["07:00:00Z", "20:00:00Z"],
                    TUESDAY: ["07:00:00Z", "20:00:00Z"],
                    WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                    THURSDAY: ["07:00:00Z", "20:00:00Z"],
                    FRIDAY: ["07:00:00Z", "20:00:00Z"],
                },
            },
            partner: {
                id: 1,
                name: 'Fretex',
                description: "...",
                phone: "40400040",
                email: "test@knowit.no",
            },
            weight: 100,
            message: {
                start: start,
                end: end,
                text: 'Tar ikke i mot barneleker ifm. Covid-19 tiltak.',
            },
            recurrenceRule: null,
        },
    },
    {
        title: 'Test',
        start: start,
        end: end,
        resource: {
            eventId: 1,
            station: {
                id: 2,
                name: "Grønmo",
                hours: {
                    MONDAY: ["07:00:00Z", "20:00:00Z"],
                    TUESDAY: ["07:00:00Z", "20:00:00Z"],
                    WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                    THURSDAY: ["07:00:00Z", "20:00:00Z"],
                    FRIDAY: ["07:00:00Z", "20:00:00Z"],
                },
            },
            partner: {
                id: 1,
                name: 'Fretex',
                description: "...",
                phone: "40400040",
                email: "test@knowit.no",
            },
            weight: 100,
            message: {
                start: start,
                end: end,
                text: 'Tar ikke i mot barneleker ifm. Covid-19 tiltak.',
            },
            recurrenceRule: {
                id: 15,
                until: end.toISOString(),
                days: [
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY"
                ],
                interval: 1,
                count: null
            }
        },
    },
];

export const mockApiEvents: Array<ApiEvent> = [
    {
        id: 91,
        startDateTime: "2020-07-13T11:45:20.57Z",
        endDateTime: "2020-07-13T12:45:20.57Z",
        station: {
            id: 1,
            name: "Smestad",
            hours: {
                MONDAY: ["07:00:00Z", "20:00:00Z"],
                TUESDAY: ["07:00:00Z", "20:00:00Z"],
                WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                THURSDAY: ["07:00:00Z", "20:00:00Z"],
                FRIDAY: ["07:00:00Z", "20:00:00Z"],
            },
        },
        partner: {
            id: 2,
            name: "Maritastiftelsen",
            description: "...",
            phone: "40400041",
            email: "test@knowit.no",
        },
        recurrenceRule: {
            id: 15,
            until: "2020-07-19T21:59:59.99Z",
            days: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY"
            ],
            interval: 1,
            count: null
        }
    },
    {
        id: 92,
        startDateTime: "2020-07-14T11:45:20.57Z",
        endDateTime: "2020-07-14T12:45:20.57Z",
        station: {
            id: 1,
            name: "Smestad",
            hours: {
                MONDAY: ["07:00:00Z", "20:00:00Z"],
                TUESDAY: ["07:00:00Z", "20:00:00Z"],
                WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                THURSDAY: ["07:00:00Z", "20:00:00Z"],
                FRIDAY: ["07:00:00Z", "20:00:00Z"],
            },
        },
        partner: {
            id: 2,
            name: "Maritastiftelsen",
            description: "...",
            phone: "40400041",
            email: "test@knowit.no",
        },
        recurrenceRule: {
            id: 15,
            until: "2020-07-19T21:59:59.99Z",
            days: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY"
            ],
            interval: 1,
            count: null
        }
    },
    {
        id: 93,
        startDateTime: "2020-07-15T11:45:20.57Z",
        endDateTime: "2020-07-15T12:45:20.57Z",
        station: {
            id: 1,
            name: "Smestad",
            hours: {
                MONDAY: ["07:00:00Z", "20:00:00Z"],
                TUESDAY: ["07:00:00Z", "20:00:00Z"],
                WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                THURSDAY: ["07:00:00Z", "20:00:00Z"],
                FRIDAY: ["07:00:00Z", "20:00:00Z"],
            },
        },
        partner: {
            id: 2,
            name: "Maritastiftelsen",
            description: "...",
            phone: "40400041",
            email: "test@knowit.no",
        },
        recurrenceRule: {
            id: 15,
            until: "2020-07-19T21:59:59.99Z",
            days: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY"
            ],
            interval: 1,
            count: null
        }
    },
    {
        id: 94,
        startDateTime: "2020-07-16T11:45:20.57Z",
        endDateTime: "2020-07-16T12:45:20.57Z",
        station: {
            id: 1,
            name: "Smestad",
            hours: {
                MONDAY: ["07:00:00Z", "20:00:00Z"],
                TUESDAY: ["07:00:00Z", "20:00:00Z"],
                WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                THURSDAY: ["07:00:00Z", "20:00:00Z"],
                FRIDAY: ["07:00:00Z", "20:00:00Z"],
            },
        },
        partner: {
            id: 2,
            name: "Maritastiftelsen",
            description: "...",
            phone: "40400041",
            email: "test@knowit.no",
        },
        recurrenceRule: {
            id: 15,
            until: "2020-07-19T21:59:59.99Z",
            days: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY"
            ],
            interval: 1,
            count: null
        }
    },
    {
        id: 95,
        startDateTime: "2020-07-17T11:45:20.57Z",
        endDateTime: "2020-07-17T12:45:20.57Z",
        station: {
            id: 1,
            name: "Smestad",
            hours: {
                MONDAY: ["07:00:00Z", "20:00:00Z"],
                TUESDAY: ["07:00:00Z", "20:00:00Z"],
                WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                THURSDAY: ["07:00:00Z", "20:00:00Z"],
                FRIDAY: ["07:00:00Z", "20:00:00Z"],
            },
        },
        partner: {
            id: 2,
            name: "Maritastiftelsen",
            description: "...",
            phone: "40400041",
            email: "test@knowit.no",
        },
        recurrenceRule: {
            id: 15,
            until: "2020-07-19T21:59:59.99Z",
            days: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY"
            ],
            interval: 1,
            count: null
        }
    },
    {
        id: 101,
        startDateTime: "2020-07-13T11:45:36.89Z",
        endDateTime: "2020-07-13T12:45:36.89Z",
        station: {
            id: 0,
            name: "Haraldrud",
            hours: {
                MONDAY: ["07:00:00Z", "20:00:00Z"],
                TUESDAY: ["07:00:00Z", "20:00:00Z"],
                WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                THURSDAY: ["07:00:00Z", "20:00:00Z"],
                FRIDAY: ["07:00:00Z", "20:00:00Z"],
            },
        },
        partner: {
            id: 1,
            name: 'Fretex',
            description: "...",
            phone: "40400040",
            email: "test@knowit.no",
        },
        recurrenceRule: {
            id: 17,
            until: "2020-07-19T21:59:59.99Z",
            days: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY"
            ],
            interval: 1,
            count: null
        }
    },
    {
        id: 102,
        startDateTime: "2020-07-14T11:45:36.89Z",
        endDateTime: "2020-07-14T12:45:36.89Z",
        station: {
            id: 0,
            name: "Haraldrud",
            hours: {
                MONDAY: ["07:00:00Z", "20:00:00Z"],
                TUESDAY: ["07:00:00Z", "20:00:00Z"],
                WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                THURSDAY: ["07:00:00Z", "20:00:00Z"],
                FRIDAY: ["07:00:00Z", "20:00:00Z"],
            },
        },
        partner: {
            id: 1,
            name: 'Fretex',
            description: "...",
            phone: "40400040",
            email: "test@knowit.no",
        },
        recurrenceRule: {
            id: 17,
            until: "2020-07-19T21:59:59.99Z",
            days: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY"
            ],
            interval: 1,
            count: null
        }
    },
    {
        id: 103,
        startDateTime: "2020-07-15T11:45:36.89Z",
        endDateTime: "2020-07-15T12:45:36.89Z",
        station: {
            id: 0,
            name: "Haraldrud",
            hours: {
                MONDAY: ["07:00:00Z", "20:00:00Z"],
                TUESDAY: ["07:00:00Z", "20:00:00Z"],
                WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                THURSDAY: ["07:00:00Z", "20:00:00Z"],
                FRIDAY: ["07:00:00Z", "20:00:00Z"],
            },
        },
        partner: {
            id: 1,
            name: 'Fretex',
            description: "...",
            phone: "40400040",
            email: "test@knowit.no",
        },
        recurrenceRule: {
            id: 17,
            until: "2020-07-19T21:59:59.99Z",
            days: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY"
            ],
            interval: 1,
            count: null
        }
    },
    {
        id: 104,
        startDateTime: "2020-07-16T11:45:36.89Z",
        endDateTime: "2020-07-16T12:45:36.89Z",
        station: {
            id: 0,
            name: "Haraldrud",
            hours: {
                MONDAY: ["07:00:00Z", "20:00:00Z"],
                TUESDAY: ["07:00:00Z", "20:00:00Z"],
                WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                THURSDAY: ["07:00:00Z", "20:00:00Z"],
                FRIDAY: ["07:00:00Z", "20:00:00Z"],
            },
        },
        partner: {
            id: 1,
            name: 'Fretex',
            description: "...",
            phone: "40400040",
            email: "test@knowit.no",
        },
        recurrenceRule: {
            id: 17,
            until: "2020-07-19T21:59:59.99Z",
            days: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY"
            ],
            interval: 1,
            count: null
        }
    },
    {
        id: 105,
        startDateTime: "2020-07-17T11:45:36.89Z",
        endDateTime: "2020-07-17T12:45:36.89Z",
        station: {
            id: 0,
            name: "Haraldrud",
            hours: {
                MONDAY: ["07:00:00Z", "20:00:00Z"],
                TUESDAY: ["07:00:00Z", "20:00:00Z"],
                WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                THURSDAY: ["07:00:00Z", "20:00:00Z"],
                FRIDAY: ["07:00:00Z", "20:00:00Z"],
            },
        },
        partner: {
            id: 1,
            name: 'Fretex',
            description: "...",
            phone: "40400040",
            email: "test@knowit.no",
        },
        recurrenceRule: {
            id: 17,
            until: "2020-07-19T21:59:59.99Z",
            days: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY"
            ],
            interval: 1,
            count: null
        }
    },
    {
        id: 106,
        startDateTime: "2020-07-16T11:45:36.89Z",
        endDateTime: "2020-07-16T12:45:36.89Z",
        station: {
            id: 1,
            name: "Smestad",
            hours: {
                MONDAY: ["07:00:00Z", "20:00:00Z"],
                TUESDAY: ["07:00:00Z", "20:00:00Z"],
                WEDNESDAY: ["07:00:00Z", "20:00:00Z"],
                THURSDAY: ["07:00:00Z", "20:00:00Z"],
                FRIDAY: ["07:00:00Z", "20:00:00Z"],
            },
        },
        partner: {
            id: 1,
            name: 'Fretex',
            description: "...",
            phone: "40400040",
            email: "test@knowit.no",
        },
        recurrenceRule: null
    }
]