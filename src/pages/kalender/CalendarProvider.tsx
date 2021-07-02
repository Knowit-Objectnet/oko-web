import React, { useContext } from 'react';
import { CalendarView, useCalendarView } from './hooks/useCalendarView';
import { useCalendarDate } from './hooks/useCalendarDate';
import { CalendarFilters, useCalendarFilters } from './hooks/useCalendarFilters';

export interface CalendarContext {
    selectedView: CalendarView;
    setSelectedView: (view: CalendarView) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    filters: CalendarFilters;
    setFilter: (filters: CalendarFilters) => void;
}

export const CalendarContext = React.createContext<CalendarContext | undefined>(undefined);

export const CalendarProvider: React.FC = ({ children }) => {
    const [selectedView, setSelectedView] = useCalendarView();
    const [selectedDate, setSelectedDate] = useCalendarDate();
    const { filters, setFilter } = useCalendarFilters();

    const value = {
        selectedView,
        setSelectedView,
        selectedDate,
        setSelectedDate,
        filters,
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
