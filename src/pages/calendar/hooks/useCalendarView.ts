import { useHistory, useParams } from 'react-router-dom';
import { View } from 'react-big-calendar';
import { Duration } from 'date-fns';
import React, { useEffect } from 'react';
import { usePersistedState } from '../../../utils/usePersistedState';

export type CalendarView = 'dag' | 'uke' | 'liste' | 'maned';

const DEFAULT_VIEW: CalendarView = 'uke';

export type ViewProperties = {
    label: string;
    viewType: View; // Extend with custom views when needed
    fetchInterval: keyof Duration;
    customComponent?: React.ReactNode; // For custom views only
};

export const VIEWS: Record<CalendarView, ViewProperties> = {
    maned: {
        label: 'Måned',
        viewType: 'month',
        fetchInterval: 'months',
    },
    uke: {
        label: 'Arbeidsuke',
        viewType: 'work_week',
        fetchInterval: 'weeks',
    },
    dag: {
        label: 'Dag',
        viewType: 'day',
        fetchInterval: 'weeks',
    },
    liste: {
        label: 'Liste',
        viewType: 'agenda',
        fetchInterval: 'months',
    },
};

const isValidView = (view?: string): view is CalendarView => (view ? Object.keys(VIEWS).includes(view) : false);

interface CalendarParams {
    view?: string;
}

export const useCalendarView = (): CalendarView => {
    // TODO: validate view name from localstorage?
    const [view, setView] = usePersistedState<CalendarView>('OKOcalView', DEFAULT_VIEW);

    // Getting view name from path (URL)
    const { view: viewFromPath } = useParams<CalendarParams>();
    const history = useHistory();

    useEffect(() => {
        if (isValidView(viewFromPath)) {
            setView(viewFromPath);
        } else if (viewFromPath !== undefined) {
            // Redirecting if view name from path is invalid
            history.replace('/kalender');
        }
    }, [viewFromPath, history, setView]);

    console.log(view);

    return view;
};
