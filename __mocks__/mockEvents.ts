import {EventInfo} from "../src/types";

const d = new Date();
const monday = new Date(d.setDate(d.getDate() - d.getDay() + (d.getDay() == 0 ? -6 : 1)));
export const mockEvents = [
    {
        title: 'Test',
        start: new Date(new Date().setHours(10)),
        end: new Date(new Date().setHours(12)),
        allDay: false,
        resource: {
            location: 'grønmo',
            driver: 'odd',
            weight: 100,
            message: {
                start: new Date(monday.setHours(12)),
                end: new Date(monday.setHours(13)),
                text: 'Tar ikke i mot barneleker ifm. Covid-19 tiltak.',
            },
        },
    },
];