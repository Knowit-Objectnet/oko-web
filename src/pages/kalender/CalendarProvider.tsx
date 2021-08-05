import React, { useContext } from 'react';
import { CalendarViewState, useCalendarView } from './hooks/useCalendarView';
import { CalendarDateState, useCalendarDate } from './hooks/useCalendarDate';
import { CalendarFilterState, useCalendarFilters } from './hooks/useCalendarFilters';

export type CalendarState = CalendarViewState & CalendarDateState & CalendarFilterState;

export const CalendarContext = React.createContext<CalendarState | undefined>(undefined);

export const CalendarProvider: React.FC = ({ children }) => {
    const viewState = useCalendarView();
    const dateState = useCalendarDate();
    const filterState = useCalendarFilters();

    const value = {
        ...viewState,
        ...dateState,
        ...filterState,
    };

    return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

export const useCalendarState = (): CalendarState => {
    const context = useContext(CalendarContext);
    if (context === undefined) {
        throw new Error('useCalendarState must be used within a CalendarProvider');
    }
    return context;
};
