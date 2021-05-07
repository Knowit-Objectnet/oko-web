import { useQueryString } from 'use-route-as-state';
import { ApiEvent } from '../../../services/EventService';
import { useStations } from '../../../services/hooks/useStations';
import { ApiStation } from '../../../services/StationService';

export interface CalendarFilters {
    stasjon?: string;
}

export type CalendarFilterFn = (event: ApiEvent) => boolean;

interface CalendarHook {
    filters: CalendarFilters;
    filterFns: Array<CalendarFilterFn>;
    setFilters: (updatedFilters: CalendarFilters) => void;
}

const isValidStasjon = (stasjonName: string, stasjoner?: Array<ApiStation>) =>
    (stasjoner ?? []).reduce((result: boolean, stasjon) => (stasjon.name === stasjonName ? true : result), false);

export const useCalendarFilters = (): CalendarHook => {
    // Getting all key=value query pairs from URL
    const [queryFilters, setQueryFilters] = useQueryString();

    const filters: CalendarFilters = {};
    const filterFns = [];

    // Checking for valid station filter name, and adding filter if present
    const { data: stasjoner } = useStations();
    if (isValidStasjon(queryFilters.stasjon, stasjoner)) {
        const stasjonFilter = (event: ApiEvent): boolean => {
            if (queryFilters.stasjon !== undefined) {
                return event.station.name === queryFilters.stasjon;
            }
            return true;
        };
        filterFns.push(stasjonFilter);
        filters.stasjon = queryFilters.stasjon;
    }

    const setFilters = (updatedFilters: CalendarFilters) => {
        setQueryFilters({ ...queryFilters, ...updatedFilters });
    };

    return { filters, filterFns, setFilters };
};
