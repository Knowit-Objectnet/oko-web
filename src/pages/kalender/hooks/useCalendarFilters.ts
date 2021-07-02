import { ApiPlanlagtHenting } from '../../../services/henting/HentingService';
import { useState } from 'react';

export interface CalendarFilters {
    stasjonFilter?: CalendarFilterFn;
}

export type CalendarFilterFn = (henting: ApiPlanlagtHenting) => boolean;

export const useCalendarFilters = (): {
    filters: CalendarFilters;
    setFilter: (filters: CalendarFilters) => void;
} => {
    const [filters, setFilters] = useState<CalendarFilters>({});

    const setFilter = (filter: CalendarFilters) => {
        // Merge together other possible filters with this updated/new one
        const updatedFilters = {
            ...filters,
            ...filter,
        };

        setFilters(updatedFilters);
    };

    return { filters, setFilter };
};
