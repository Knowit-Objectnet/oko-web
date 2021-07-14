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

export interface CalendarEvent extends Event {
    start: Date;
    end: Date;
    hentingWrapper: ApiHentingWrapper;
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

const transformPlanlagteHentingerToCalendarEvent = (planlagtHenting: ApiPlanlagtHenting): CalendarEvent => ({
    start: parseISOIgnoreTimezone(planlagtHenting.startTidspunkt),
    end: parseISOIgnoreTimezone(planlagtHenting.sluttTidspunkt),
    title: `${planlagtHenting.aktorNavn} - ${planlagtHenting.stasjonNavn}`,
    hentingWrapper: {
        id: planlagtHenting.id,
        startTidspunkt: planlagtHenting.startTidspunkt,
        sluttTidspunkt: planlagtHenting.sluttTidspunkt,
        type: 'PLANLAGT',
        planlagtHenting,
        stasjonId: planlagtHenting.stasjonId,
        stasjonNavn: planlagtHenting.stasjonNavn,
        aktorId: planlagtHenting.aktorId,
        aktorNavn: planlagtHenting.aktorNavn,
    },
});

const transformEkstraHentingerToCalendarEvent = (ekstraHenting: ApiEkstraHenting): CalendarEvent => ({
    start: parseISOIgnoreTimezone(ekstraHenting.startTidspunkt),
    end: parseISOIgnoreTimezone(ekstraHenting.sluttTidspunkt),
    title: `${ekstraHenting.godkjentUtlysning?.partnerNavn} - ${ekstraHenting.stasjonNavn}`,
    hentingWrapper: {
        id: ekstraHenting.id,
        startTidspunkt: ekstraHenting.startTidspunkt,
        sluttTidspunkt: ekstraHenting.sluttTidspunkt,
        type: 'EKSTRA',
        ekstraHenting,
        stasjonId: ekstraHenting.stasjonId,
        stasjonNavn: ekstraHenting.stasjonNavn,
        aktorId: ekstraHenting.godkjentUtlysning?.partnerId,
        aktorNavn: ekstraHenting.godkjentUtlysning?.partnerNavn,
    },
});

export const useCalendarEvents = (): CalendarEvent[] => {
    const { selectedView, selectedDate, filters } = useCalendarState();

    const intervalToFetch = calculateDateRange(selectedDate, selectedView);

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

    const filteredPlanlagteHentinger = (planlagteHentinger ?? []).filter((henting) =>
        Object.values(filters).reduce((result: boolean, filterFn) => filterFn(henting), true),
    );

    const filteredEkstraHentinger = (ekstraHentinger ?? []).filter((henting) =>
        Object.values(filters).reduce((result: boolean, filterFn) => filterFn(henting), true),
    );

    const allCalendarEvents = filteredPlanlagteHentinger
        .map(transformPlanlagteHentingerToCalendarEvent)
        .concat(filteredEkstraHentinger.map(transformEkstraHentingerToCalendarEvent));

    return allCalendarEvents;
};
