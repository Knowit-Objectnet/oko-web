import { useHistory, useParams } from 'react-router-dom';
import { calendarConfig, CalendarView, ViewPathKey } from '../CalendarConfig';

const isValidPathKey = (viewId: string): viewId is ViewPathKey =>
    Object.values(calendarConfig.viewProperties).some((viewProperties) => viewProperties.pathKey === viewId.trim());

const getViewFromPathKey = (viewKey: ViewPathKey) =>
    Object.keys(calendarConfig.viewProperties).find(
        (key) => calendarConfig.viewProperties[key as CalendarView].pathKey === viewKey,
    ) as CalendarView;

const getPersistedView = (key: string): CalendarView | undefined => {
    const localStorageItem = localStorage.getItem(key);
    return localStorageItem ? JSON.parse(localStorageItem) : undefined;
};

const setPersistedView = (key: string, view: CalendarView) => {
    localStorage.setItem(key, JSON.stringify(view));
};

const localStorageKey = 'OKOcalView';

export const useCalendarView = (): CalendarView => {
    const history = useHistory();
    const { viewKey } = useParams<{ viewKey?: string }>();

    let view = getPersistedView(localStorageKey) ?? calendarConfig.defaultView;

    if (viewKey !== undefined) {
        if (isValidPathKey(viewKey)) {
            const newView = getViewFromPathKey(viewKey);
            setPersistedView(localStorageKey, newView);
            view = newView;
        } else {
            history.replace('/kalender');
        }
    }

    return view;
};
