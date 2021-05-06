import { useHistory, useParams } from 'react-router-dom';
import { calendarConfig, CalendarView, ViewPathKey } from '../CalendarConfig';

// TODO: make changes to the calendarConfig to make this prettier
const isValidPathKey = (viewId: string): viewId is ViewPathKey =>
    Object.values(calendarConfig.viewProperties).some((viewProperties) => viewProperties.pathKey === viewId.trim());

// TODO: make changes to the calendarConfig to make this prettier
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

export const useCalendarView = (): CalendarView => {
    const history = useHistory();
    const { viewKey } = useParams<{ viewKey?: string }>();

    const localStorageKey = 'OKOcalView';
    let view = getPersistedView(localStorageKey) ?? calendarConfig.defaultView;

    // TODO: ideally make this more elegant
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
