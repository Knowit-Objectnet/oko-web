import { useQueryString } from 'use-route-as-state';
import { useStations } from '../../../services/hooks/useStations';
import { ApiStation } from '../../../services/StationService';
import { ApiHenting } from '../../../services-currentapi/HentingService';

export interface CalendarFilters {
    stasjon?: string;
}

export type CalendarFilterFn = (henting: ApiHenting) => boolean;

const isValidStasjon = (stasjonName: string, stasjoner?: Array<ApiStation>) =>
    (stasjoner ?? []).reduce((result: boolean, stasjon) => (stasjon.name === stasjonName ? true : result), false);

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
    const { data: stasjoner } = useStations();
    if (isValidStasjon(queryFilters.stasjon, stasjoner)) {
        const stasjonFilter = (henting: ApiHenting): boolean => {
            /* TODO: reactivate when henting has stasjon reference
            if (queryFilters.stasjon !== undefined) {
                return henting.station.name === queryFilters.stasjon;
            }*/
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
