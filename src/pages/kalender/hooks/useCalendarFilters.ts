import { useQueryString } from 'use-route-as-state';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';
import { ApiPlanlagtHenting } from '../../../services/henting/HentingService';
import { useStasjoner } from '../../../services/stasjon/useStasjoner';

export interface CalendarFilters {
    stasjon?: string[];
}

export type CalendarFilterFn = (event: ApiPlanlagtHenting) => boolean;

const isValidStasjon = (stasjonName: string, stasjoner?: Array<ApiStasjon>) =>
    (stasjoner ?? []).reduce((result: boolean, stasjon) => (stasjon.navn === stasjonName ? true : result), false);

export const useCalendarFilters = (): {
    filters: CalendarFilters;
    filterFns: Array<CalendarFilterFn>;
    setFilters: (updatedFilters: CalendarFilters) => void;
} => {
    // Getting all key=value query pairs from URL
    const [queryFilters, setQueryFilters] = useQueryString();
    const filters: CalendarFilters = {};
    const filterFns = [];

    // Checking for valid station filter name, and adding filter if present
    const { data: stasjoner } = useStasjoner();

    const stasjonFilter = (event: ApiPlanlagtHenting): boolean => {
        if (stasjoner) return stasjoner?.some((stasjon) => event.stasjonId === stasjon.id);
        return true;
    };
    filterFns.push(stasjonFilter);
    //filters.stasjon?.push(queryFilters.stasjon);

    const setFilters = (updatedFilters: CalendarFilters) => {
        setQueryFilters({});
    };

    return { filters, filterFns, setFilters };
};
