import { ApiPlanlagtHenting } from '../../../services/henting/PlanlagtHentingService';
import { useState } from 'react';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';

export interface CalendarFilters {
    stasjonFilter?: CalendarFilterFn;
}

export type CalendarFilterFn = (henting: ApiHentingWrapper) => boolean;

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
