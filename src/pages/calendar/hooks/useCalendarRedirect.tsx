import { useHistory, useLocation } from 'react-router-dom';
import { CalendarView } from './useCalendarView';

interface Params {
    view?: CalendarView;
}

export const useCalendarRedirect = (): ((props?: Params) => void) => {
    const history = useHistory();
    const { search } = useLocation();

    return ({ view } = {}) => {
        const redirectUrl = `/kalender/${view}${search}`;
        history.replace(redirectUrl);
    };
};
