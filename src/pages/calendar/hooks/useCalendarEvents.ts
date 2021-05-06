import { useEvents } from '../../../services/hooks/useEvents';
import { DateRange, Event as CalendarEvent, View } from 'react-big-calendar';
import { calculateDateRange } from '../CalendarProvider';
import { usePrefetchEvents } from './usePrefetchEvents';
import { calendarConfig } from '../CalendarConfig';

export const useCalendarEvents = (
    selectedDate: Date,
    selectedView: View,
    selectedStationId?: number,
): CalendarEvent[] => {
    const intervalToFetch: DateRange = calculateDateRange(selectedDate, selectedView);

    // TODO: wrap in LazyResult in order to return loading/error status?
    const { data: events } = useEvents(
        {
            fromDate: intervalToFetch.start.toISOString(),
            toDate: intervalToFetch.end.toISOString(),
        },
        {
            keepPreviousData: true,
            refetchInterval: calendarConfig.refetchIntervalMs,
        },
    );

    usePrefetchEvents(intervalToFetch, selectedView);

    return (events ?? [])
        .filter((event) => selectedStationId === undefined || event.station.id === selectedStationId)
        .map((event) => ({
            start: new Date(event.startDateTime),
            end: new Date(event.endDateTime),
            title: `${event.partner.name} - ${event.station.name}`,
        }));
};
