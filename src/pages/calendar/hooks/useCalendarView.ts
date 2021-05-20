import { useHistory, useLocation, useParams } from 'react-router-dom';
import { View } from 'react-big-calendar';
import { Duration } from 'date-fns';
import React, { useEffect } from 'react';
import { usePersistedState } from '../../../utils/usePersistedState';
import findKey from 'lodash/findKey';

export type CalendarView = 'dag' | 'uke' | 'liste' | 'maned';

const DEFAULT_VIEW: CalendarView = 'uke';

export type ViewProperties = {
    label: string;
    type: View; // Extend with custom views when needed
    fetchInterval: keyof Duration;
    customComponent?: React.ReactNode; // For custom views only
};

export const VIEWS: Record<CalendarView, ViewProperties> = {
    maned: {
        label: 'Måned',
        type: 'month',
        fetchInterval: 'months',
    },
    uke: {
        label: 'Uke',
        type: 'week',
        fetchInterval: 'weeks',
    },
    dag: {
        label: 'Dag',
        type: 'day',
        fetchInterval: 'weeks',
    },
    liste: {
        label: 'Liste',
        type: 'agenda',
        fetchInterval: 'months',
    },
};

export const isValidView = (view?: string): view is CalendarView => (view ? Object.keys(VIEWS).includes(view) : false);

export const getCalendarViewFromType = (viewType: View): CalendarView => {
    const calendarView = findKey(VIEWS, (viewProperties) => viewProperties.type === viewType);
    if (isValidView(calendarView)) {
        return calendarView;
    } else {
        throw new Error('View identifier string is invalid');
    }
};

interface CalendarParams {
    view?: string;
}

const useCalendarRedirect = () => {
    const history = useHistory();
    const { search: queryString } = useLocation();

    return (params?: CalendarParams) => {
        const redirectView = params?.view ? `/${params.view}` : '';
        const redirectUrl = `/kalender${redirectView}${queryString}`;
        history.replace(redirectUrl);
    };
};

export const useCalendarView = (): [CalendarView, (view: CalendarView) => void] => {
    // Getting view name from path (URL)
    const { view: viewFromPath } = useParams<CalendarParams>();

    // View name is persisted to localstorage, with a default value if not provided in path (URL)
    // TODO: validate view name from localstorage, in case user has manipulated it?
    const [persistedView, setPersistedView] = usePersistedState<CalendarView>('OKOcalView', DEFAULT_VIEW);

    const redirectToCalendar = useCalendarRedirect();

    // If the view name from path (URL) changes
    useEffect(() => {
        if (isValidView(viewFromPath)) {
            setPersistedView(viewFromPath);
        } else if (viewFromPath !== undefined) {
            // Redirecting if view name from path is invalid
            redirectToCalendar();
        }
    }, [viewFromPath, setPersistedView, redirectToCalendar]);

    const setView = (view: CalendarView) => {
        redirectToCalendar({ view });
    };

    return [persistedView, setView];
};
