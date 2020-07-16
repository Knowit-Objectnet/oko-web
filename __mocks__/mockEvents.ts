import {EventInfo} from "../src/types";

const d = new Date();
const start = new Date(d.setDate(d.getDate() - d.getDay() + (d.getDay() == 0 ? -6 : 1)));
const end = new Date(d.setDate(d.getDate() - d.getDay() + (d.getDay() == 0 ? -6 : 1)));
start.setHours(10);
end.setHours(12)

export const mockEvents = [
    {
        title: 'Test',
        start: start,
        end: end,
        allDay: false,
        resource: {
            location: {
                id: 1,
                name: 'grønmo'
            },
            weight: 100,
            message: {
                start: start,
                end: end,
                text: 'Tar ikke i mot barneleker ifm. Covid-19 tiltak.',
            },
        },
    },
];

export const mockApiEvents = [
    {
        id: 91,
        startDateTime: "2020-07-13T11:45:20.57Z",
        endDateTime: "2020-07-13T12:45:20.57Z",
        station: {
            id: 1,
            name: "Haraldrud"
        },
        partner: {
            id: 1,
            name: "Fretex"
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
            name: "Haraldrud"
        },
        partner: {
            id: 1,
            name: "Fretex"
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
            name: "Haraldrud"
        },
        partner: {
            id: 1,
            name: "Fretex"
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
            name: "Haraldrud"
        },
        partner: {
            id: 1,
            name: "Fretex"
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
            name: "Haraldrud"
        },
        partner: {
            id: 1,
            name: "Fretex"
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
            id: 1,
            name: "Haraldrud"
        },
        partner: {
            id: 1,
            name: "Fretex"
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
            id: 1,
            name: "Haraldrud"
        },
        partner: {
            id: 1,
            name: "Fretex"
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
            id: 1,
            name: "Haraldrud"
        },
        partner: {
            id: 1,
            name: "Fretex"
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
            id: 1,
            name: "Haraldrud"
        },
        partner: {
            id: 1,
            name: "Fretex"
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
            id: 1,
            name: "Haraldrud"
        },
        partner: {
            id: 1,
            name: "Fretex"
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
    }
]