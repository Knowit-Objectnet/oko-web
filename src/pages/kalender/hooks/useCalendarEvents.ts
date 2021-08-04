import { DateRange, Event } from 'react-big-calendar';
import { usePrefetchPlanlagteHentinger } from './usePrefetchPlanlagteHentinger';
import { endOfISOWeek, endOfMonth, startOfISOWeek, startOfMonth } from 'date-fns';
import { CalendarView, VIEWS } from './useCalendarView';
import { useCalendarState } from '../CalendarProvider';
import { usePlanlagteHentinger } from '../../../services/henting/usePlanlagteHentinger';
import { ApiPlanlagtHenting } from '../../../services/henting/PlanlagtHentingService';
import { parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';
import { ApiEkstraHenting } from '../../../services/henting/EkstraHentingService';
import { usePrefetchEkstraHentinger } from './usePrefetchEkstraHentinger';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { useEkstraHentingerWithUtlysning } from '../../../services/henting/useEkstraHentingerWithUtlysning';
import { useEffect, useState } from 'react';
import { usePartnere } from '../../../services/partner/usePartnere';
import { useStasjoner } from '../../../services/stasjon/useStasjoner';
import { getGradientColors } from '../../../utils/gradientColors';

export interface CalendarEvent extends Event {
    start: Date;
    end: Date;
    hentingWrapper: ApiHentingWrapper;
    partnerColors: Record<string, string>;
    stasjonColors: Record<string, string>;
}

const calculateDateRange = (date: Date, view: CalendarView): DateRange => {
    const intervalSize = VIEWS[view].fetchInterval;
    switch (intervalSize) {
        case 'weeks':
            return {
                start: startOfISOWeek(date),
                end: endOfISOWeek(date),
            };
        case 'months':
            return {
                start: startOfMonth(date),
                end: endOfMonth(date),
            };
        default:
            throw new Error('Unsupported calendar view name provided when calculating date range');
    }
};

const transformPlanlagtHentingToHentingWrapper = (planlagtHenting: ApiPlanlagtHenting): ApiHentingWrapper => ({
    id: planlagtHenting.id,
    startTidspunkt: planlagtHenting.startTidspunkt,
    sluttTidspunkt: planlagtHenting.sluttTidspunkt,
    type: 'PLANLAGT',
    planlagtHenting,
    stasjonId: planlagtHenting.stasjonId,
    stasjonNavn: planlagtHenting.stasjonNavn,
    aktorId: planlagtHenting.aktorId,
    aktorNavn: planlagtHenting.aktorNavn,
});

const transformEkstraHentingToHentingWrapper = (ekstraHenting: ApiEkstraHenting): ApiHentingWrapper => ({
    id: ekstraHenting.id,
    startTidspunkt: ekstraHenting.startTidspunkt,
    sluttTidspunkt: ekstraHenting.sluttTidspunkt,
    type: 'EKSTRA',
    ekstraHenting,
    stasjonId: ekstraHenting.stasjonId,
    stasjonNavn: ekstraHenting.stasjonNavn,
    aktorId: ekstraHenting.godkjentUtlysning?.partnerId,
    aktorNavn: ekstraHenting.godkjentUtlysning?.partnerNavn,
});

export const useCalendarEvents = (): CalendarEvent[] => {
    const { selectedView, selectedDate, filters } = useCalendarState();
    const [partnerColors, setPartnerColors] = useState<Record<string, string>>({});
    const [stasjonColors, setStasjonColors] = useState<Record<string, string>>({});
    const { data: partnere, isSuccess: partnerSuccess } = usePartnere();
    const { data: stasjoner, isSuccess: stasjonSuccess } = useStasjoner();

    useEffect(() => {
        if (partnerSuccess) {
            setPartnerColors(getGradientColors(partnere));
        }
    }, [partnere]);

    useEffect(() => {
        if (stasjonSuccess) {
            setStasjonColors(getGradientColors(stasjoner));
        }
    }, [stasjoner]);

    const intervalToFetch = calculateDateRange(selectedDate, selectedView);

    const transformHentingWrapperToCalendarEvent = (hentingWrapper: ApiHentingWrapper): CalendarEvent => ({
        start: parseISOIgnoreTimezone(hentingWrapper.startTidspunkt),
        end: parseISOIgnoreTimezone(hentingWrapper.sluttTidspunkt),
        title: `${hentingWrapper.aktorNavn} - ${hentingWrapper.stasjonNavn}`,
        hentingWrapper: hentingWrapper,
        partnerColors: partnerColors,
        stasjonColors: stasjonColors,
    });

    // TODO: wrap in LazyResult in order to return loading/error status?
    const { data: planlagteHentinger } = usePlanlagteHentinger(
        {
            after: intervalToFetch.start.toISOString(),
            before: intervalToFetch.end.toISOString(),
        },
        {
            keepPreviousData: true,
            refetchInterval: 30_000,
        },
    );

    const { data: ekstraHentinger } = useEkstraHentingerWithUtlysning(
        {
            after: intervalToFetch.start.toISOString(),
            before: intervalToFetch.end.toISOString(),
        },
        {
            keepPreviousData: true,
            refetchInterval: 30_000,
        },
    );

    // Fetching events for previous and next interval as well
    usePrefetchPlanlagteHentinger(intervalToFetch);
    usePrefetchEkstraHentinger(intervalToFetch);

    const filteredHentinger = (planlagteHentinger || [])
        .map(transformPlanlagtHentingToHentingWrapper)
        .concat((ekstraHentinger ?? []).map(transformEkstraHentingToHentingWrapper))
        .filter((henting) =>
            Array.from(filters.values()).reduce((result: boolean, filterFn) => filterFn(henting) && result, true),
        );

    const allCalendarEvents = filteredHentinger.map(transformHentingWrapperToCalendarEvent);

    return allCalendarEvents;
};
