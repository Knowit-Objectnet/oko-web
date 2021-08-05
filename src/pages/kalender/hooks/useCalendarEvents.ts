import { DateRange, Event } from 'react-big-calendar';
import { CalendarView, VIEWS } from './useCalendarView';
import { useCalendarState } from '../CalendarProvider';
import { dateTimeToStringIgnoreTimezone, parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';
import { ApiHentingWrapper, getHentinger, hentingDefaultQueryKey } from '../../../services/henting/HentingService';
import { useQueries, UseQueryResult } from 'react-query';
import { getAllISOWeeksInMonth, getSingleISOWeek } from '../../../utils/ISOWeekHelpers';
import { Failure, LazyResult, Loading, Success } from 'lemons';
import { useCalendarEventColors } from './useCalendarEventColors';
import { useAuth } from '../../../auth/useAuth';

export interface CalendarEvent extends Event {
    start: Date;
    end: Date;
    hentingWrapper: ApiHentingWrapper;
    color: string;
}

const getISOWeeksToFetch = (date: Date, view: CalendarView): Array<DateRange> => {
    const intervalSize = VIEWS[view].fetchInterval;
    switch (intervalSize) {
        case 'weeks':
            return [getSingleISOWeek(date)];
        case 'months':
            return getAllISOWeeksInMonth(date);
        default:
            throw new Error('Unsupported calendar view name provided when calculating date range');
    }
};

export const useCalendarEvents = (): LazyResult<string, Array<CalendarEvent>> => {
    const { selectedView, selectedDate, filters } = useCalendarState();

    const { user } = useAuth();
    const getAktorColor = useCalendarEventColors();

    const transformToCalendarEvent = (hentingWrapper: ApiHentingWrapper): CalendarEvent => ({
        start: parseISOIgnoreTimezone(hentingWrapper.startTidspunkt),
        end: parseISOIgnoreTimezone(hentingWrapper.sluttTidspunkt),
        hentingWrapper: hentingWrapper,
        color: user.isPartner ? getAktorColor(hentingWrapper.stasjonId) : getAktorColor(hentingWrapper.aktorId),
    });

    // Fetching hentinger week-by-week, so that each week gets an entry in the cache
    //  This allows us to reuse the cached data when the user switches views, while also
    //  avoiding fetching alot more data than needed (week/day-view = fetches one week of data)
    const weeksWithHentinger = useQueries(
        getISOWeeksToFetch(selectedDate, selectedView).map((week) => ({
            queryKey: [hentingDefaultQueryKey, week],
            queryFn: () =>
                getHentinger({
                    after: dateTimeToStringIgnoreTimezone(week.start),
                    before: dateTimeToStringIgnoreTimezone(week.end),
                }),
            keepPreviousData: true,
        })),
    ) as Array<UseQueryResult<Array<ApiHentingWrapper>>>;
    // We have to use type assertion here (`as`) because the `useQueries`-hook doesn't support
    //  strong typing by default (see: https://github.com/tannerlinsley/react-query/pull/1527)

    const queriesAreLoading = weeksWithHentinger.reduce(
        (result: boolean, currentQuery) => currentQuery.isLoading || result,
        false,
    );
    if (queriesAreLoading) {
        return Loading();
    }

    const queriesHasErrors = weeksWithHentinger.reduce(
        (result: boolean, currentQuery) => currentQuery.isError || result,
        false,
    );
    if (queriesHasErrors) {
        return Failure('Uffda, noe gikk galt ved lasting av hentinger.');
    }

    // Merging the data from all the henting query results in to a single array of hentinger
    const alleHentinger = weeksWithHentinger.flatMap(({ data }) => data || []);

    // Applying filters set by user (from useCalendarFilters)
    const filteredHentinger = alleHentinger.filter((henting) =>
        Array.from(filters.values()).reduce((result: boolean, filterFn) => filterFn(henting) && result, true),
    );

    const calendarEvents = filteredHentinger.map(transformToCalendarEvent);

    return Success(calendarEvents);
};
