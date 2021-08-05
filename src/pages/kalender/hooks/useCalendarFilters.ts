import { useState } from 'react';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';

export type CalendarFilters = Map<string, CalendarFilterFn>;

export type CalendarFilterFn = (henting: ApiHentingWrapper) => boolean;

export interface CalendarFilterState {
    filters: CalendarFilters;
    setFilter: (filterName: string, filterFn: CalendarFilterFn) => void;
    clearFilter: (filterName: string) => void;
}

export const useCalendarFilters = (): CalendarFilterState => {
    const [filters, setFilters] = useState<CalendarFilters>(new Map());

    const setFilter = (filterName: string, filterFn: CalendarFilterFn) => {
        setFilters((currentFilters) => new Map(currentFilters).set(filterName, filterFn));
    };

    const clearFilter = (filterName: string) => {
        setFilters((currentFilters) => {
            const newFilters = new Map(currentFilters);
            newFilters.delete(filterName);
            return newFilters;
        });
    };

    return { filters, setFilter, clearFilter };
};
