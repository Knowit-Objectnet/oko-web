import React, { useContext } from 'react';
import { CalendarView, useCalendarView } from './hooks/useCalendarView';
import { useCalendarDate } from './hooks/useCalendarDate';
import { CalendarFilter, useCalendarFilter } from './hooks/useCalendarFilter';

export interface CalendarContext {
    selectedView: CalendarView;
    setSelectedView: (view: CalendarView) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    filter: CalendarFilter;
    setFilter: (filter: CalendarFilter) => void;
}

export const CalendarContext = React.createContext<CalendarContext | undefined>(undefined);

export const CalendarProvider: React.FC = ({ children }) => {
    const [selectedView, setSelectedView] = useCalendarView();

    const [selectedDate, setSelectedDate] = useCalendarDate();
    const [filter, setFilter] = useCalendarFilter();

    const value = {
        selectedView,
        setSelectedView,
        selectedDate,
        setSelectedDate,
        filter,
        setFilter,
    };

    return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

export const useCalendarState = (): CalendarContext => {
    const context = useContext(CalendarContext);
    if (context === undefined) {
        throw new Error('useCalendarState must be used within a CalendarProvider');
    }
    return context;
};
