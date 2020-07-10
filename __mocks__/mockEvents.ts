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