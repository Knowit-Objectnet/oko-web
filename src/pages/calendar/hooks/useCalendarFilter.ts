import { useQueryString } from 'use-route-as-state';
import { useStations } from '../../../services/hooks/useStations';
import { ApiStation } from '../../../services/StationService';

const getStasjonIdFromName = (stasjonName: string, stasjoner?: Array<ApiStation>) => {
    return (stasjoner ?? []).reduce(
        (result: number | undefined, stasjon) => (stasjon.name === stasjonName ? stasjon.id : result),
        undefined,
    );
};

const getStasjonNameFromId = (stasjonId?: number, stasjoner?: Array<ApiStation>) =>
    (stasjoner ?? []).reduce(
        (result: string | undefined, stasjon) => (stasjon.id === Number(stasjonId) ? stasjon.name : result),
        undefined,
    );

export interface CalendarFilter {
    stasjonId?: number;
}

interface CalendarQueryFilter {
    stasjon?: string;
}

export const useCalendarFilter = (): [CalendarFilter, (filter: CalendarFilter) => void] => {
    const [queryFilter, setQueryFilter] = useQueryString();
    const { data: stasjoner } = useStations();

    const filter: CalendarFilter = {
        stasjonId: getStasjonIdFromName(queryFilter.stasjon, stasjoner),
    };

    const setFilter = (filter: CalendarFilter) => {
        const newFilter: CalendarQueryFilter = {
            stasjon: getStasjonNameFromId(filter.stasjonId, stasjoner),
        };
        setQueryFilter({ ...queryFilter, ...newFilter });
    };

    return [filter, setFilter];
};
