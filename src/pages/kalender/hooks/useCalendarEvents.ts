import { useEvents } from '../../../services/hooks/useEvents';
import { DateRange, Event as CalendarEvent } from 'react-big-calendar';
import { usePrefetchEvents } from './usePrefetchEvents';
import { endOfISOWeek, endOfMonth, startOfISOWeek, startOfMonth } from 'date-fns';
import { ApiEvent } from '../../../services/EventService';
import { CalendarView, VIEWS } from './useCalendarView';
import { useCalendarState } from '../CalendarProvider';
import { usePlanlagteHentinger } from '../../../services-currentapi/hooks/usePlanlagteHentinger';
import { ApiPlanlagtHenting } from '../../../services-currentapi/HentingService';

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

const transformToCalendarEvent = () => (event: ApiPlanlagtHenting): CalendarEvent => ({
    start: new Date(event.startTidspunkt),
    end: new Date(event.sluttTidspunkt),
    title: 'No partner/stasjon data', //TODO: Add Henting type including partner and stasjon
    // title: `${event.partner.name} - ${event.station.name}`,
});

export const useCalendarEvents = (): CalendarEvent[] => {
    const { selectedView, selectedDate, filterFns } = useCalendarState();

    const intervalToFetch = calculateDateRange(selectedDate, selectedView);

    // TODO: wrap in LazyResult in order to return loading/error status?
    const { data: events } = usePlanlagteHentinger(
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
    usePrefetchEvents(intervalToFetch);

    const filteredEvents = (events ?? []).filter((event) =>
        filterFns.reduce((result: boolean, filterFn) => filterFn(event), true),
    );

    return filteredEvents.map(transformToCalendarEvent());
};
