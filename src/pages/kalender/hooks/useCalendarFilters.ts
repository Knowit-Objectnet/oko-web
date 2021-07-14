import { ApiPlanlagtHenting } from '../../../services/henting/PlanlagtHentingService';
import { useEffect, useState } from 'react';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { useAuth } from '../../../auth/useAuth';

export interface CalendarFilters {
    stasjonFilter?: CalendarFilterFn;
    partnerFilter?: CalendarFilterFn;
}

export type CalendarFilterFn = (henting: ApiHentingWrapper) => boolean;

export const useCalendarFilters = (): {
    filters: CalendarFilters;
    setFilter: (filters: CalendarFilters) => void;
} => {
    const { user } = useAuth();
    const [filters, setFilters] = useState<CalendarFilters>({});

    //Set default behavious to only see own events. Have to use useEffect, as user.aktorId might be undefined initially
    useEffect(() => {
        if (user.isPartner)
            setFilter({
                partnerFilter: (henting: ApiHentingWrapper) =>
                    henting.aktorId === user.aktorId ||
                    henting.ekstraHenting?.utlysninger.some((utlysning) => utlysning.partnerId === user.aktorId) ||
                    false,
            });
        if (user.isStasjon)
            setFilter({ stasjonFilter: (henting: ApiHentingWrapper) => henting.stasjonId === user.aktorId });
    }, [user.aktorId]);

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
