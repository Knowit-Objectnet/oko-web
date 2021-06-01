import { useQueryString } from 'use-route-as-state';
import { ApiStasjon } from '../../../services-currentapi/StasjonService';
import { ApiPlanlagtHenting } from '../../../services-currentapi/HentingService';
import { useStasjoner } from '../../../services-currentapi/hooks/useStasjoner';
import { ApiEvent } from '../../../services/EventService';
import { useStations } from '../../../services/hooks/useStations';
import { ApiStation } from '../../../services/StationService';

export interface CalendarFilters {
    stasjon?: string;
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
    // const { data: stasjoner } = useStations();
    const { data: stasjoner } = useStasjoner();
    if (isValidStasjon(queryFilters.stasjon, stasjoner)) {
        const stasjonFilter = (event: ApiPlanlagtHenting): boolean => {
            //TODO: Allow filtering when datatype containing stasjon is added
            // if (queryFilters.stasjon !== undefined) {
            //     return event.station.name === queryFilters.stasjon;
            // }
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
