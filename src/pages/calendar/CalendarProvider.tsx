import React from 'react';
import { CalendarView, useCalendarView } from './hooks/useCalendarView';
import { useCalendarDate } from './hooks/useCalendarDate';

export interface CalendarFilters {
    stasjonId?: number;
}

export interface CalendarContext {
    selectedView: CalendarView;
    setSelectedView: (view: CalendarView) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    // filters: CalendarFilters;
    // setFilters: (filter: CalendarFilters) => void;
}

export const CalendarContext = React.createContext<CalendarContext | undefined>(undefined);

export const CalendarProvider: React.FC = ({ children }) => {
    const [selectedView, setSelectedView] = useCalendarView();

    const [selectedDate, setSelectedDate] = useCalendarDate();
    // const [filters, setFilters] = useCalendarFilters();

    const value = {
        selectedView,
        setSelectedView,
        selectedDate,
        setSelectedDate,
        // filters,
        // setFilters,
    };

    return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};
