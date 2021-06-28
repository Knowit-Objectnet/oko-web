import { DateRange, Event as CalendarEvent } from 'react-big-calendar';
import { usePrefetchHentinger } from './usePrefetchHentinger';
import { endOfISOWeek, endOfMonth, startOfISOWeek, startOfMonth } from 'date-fns';
import { CalendarView, VIEWS } from './useCalendarView';
import { useCalendarState } from '../CalendarProvider';
import { usePlanlagteHentinger } from '../../../services/henting/usePlanlagteHentinger';
import { ApiPlanlagtHenting } from '../../../services/henting/HentingService';
import { parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';

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

const transformToCalendarEvent = (planlagtHenting: ApiPlanlagtHenting): CalendarEvent => ({
    start: parseISOIgnoreTimezone(planlagtHenting.startTidspunkt),
    end: parseISOIgnoreTimezone(planlagtHenting.sluttTidspunkt),
    title: `${planlagtHenting.aktorNavn} - ${planlagtHenting.stasjonNavn}`,
});

export const useCalendarEvents = (): CalendarEvent[] => {
    const { selectedView, selectedDate, filterFns } = useCalendarState();

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

    // Fetching events for previous and next interval as well
    usePrefetchHentinger(intervalToFetch);

    const filteredPlanlagteHentinger = (planlagteHentinger ?? []).filter((event) =>
        filterFns.reduce((result: boolean, filterFn) => filterFn(event), true),
    );

    return filteredPlanlagteHentinger.map(transformToCalendarEvent);
};
