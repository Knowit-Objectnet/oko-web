import { Duration } from 'date-fns';
import { View, ViewsProps } from 'react-big-calendar';

export type CalendarView = View; // TODO extend with custom views

export type ViewPathKey = 'dag' | 'uke' | 'arbeidsuke' | 'liste' | 'maned';

export type ViewProperties = {
    label: string;
    pathKey: ViewPathKey;
    fetchInterval: keyof Duration;
};

interface CalendarConfig {
    minDisplayHour: number;
    refetchIntervalMs: number;
    defaultView: CalendarView;
    visibleViews: ViewsProps;
    viewProperties: Record<CalendarView, ViewProperties>;
}

export const calendarConfig: CalendarConfig = {
    defaultView: 'work_week',
    minDisplayHour: 6,
    refetchIntervalMs: 30_000,
    visibleViews: { month: true, work_week: true, agenda: true, day: true }, // TODO: add custom view component here
    viewProperties: {
        day: {
            label: 'Dag',
            pathKey: 'dag',
            fetchInterval: 'weeks',
        },
        week: {
            label: 'Uke',
            pathKey: 'uke',
            fetchInterval: 'weeks',
        },
        work_week: {
            label: 'Arbeidsuke',
            pathKey: 'arbeidsuke',
            fetchInterval: 'weeks',
        },
        agenda: {
            label: 'Liste',
            pathKey: 'liste',
            fetchInterval: 'months',
        },
        month: {
            label: 'Måned',
            pathKey: 'maned',
            fetchInterval: 'months',
        },
    },
};
