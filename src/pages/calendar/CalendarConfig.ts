import { Duration } from 'date-fns';
import { CalendarView } from './CalendarProvider';

type CalendarViewProperties = {
    [key in CalendarView]: {
        label: string;
        fetchInterval: keyof Duration;
    };
};

export const viewProperties: CalendarViewProperties = {
    day: {
        label: 'Dag',
        fetchInterval: 'weeks',
    },
    week: {
        label: 'Uke',
        fetchInterval: 'weeks',
    },
    work_week: {
        label: 'Arbeidsuke',
        fetchInterval: 'weeks',
    },
    agenda: {
        label: 'Liste',
        fetchInterval: 'months',
    },
    month: {
        label: 'Måned',
        fetchInterval: 'months',
    },
};
