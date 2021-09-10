import { isFuture, startOfToday } from 'date-fns';
import React from 'react';
import { useEkstraHentingerWithUtlysning } from '../../services/henting/useEkstraHentingerWithUtlysning';
import { dateTimeToStringIgnoreTimezone, parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { EkstraHentingHeading } from './EkstraHentingHeading';
import { sortedEkstraHentingerByDatoDesc } from './EkstraHentingSortedInfo';

export const EkstraHentingInfoListStasjon: React.FC = () => {
    const {
        data: ekstraHentinger,
        isLoading,
        isError,
    } = useEkstraHentingerWithUtlysning({
        after: dateTimeToStringIgnoreTimezone(startOfToday()),
    });

    const sortedEkstraHentinger = sortedEkstraHentingerByDatoDesc(ekstraHentinger ?? []);

    const aktiveEkstrahentinger = sortedEkstraHentinger.filter((ekstraHentinger) =>
        isFuture(parseISOIgnoreTimezone(ekstraHentinger.sluttTidspunkt)),
    );

    return (
        <EkstraHentingHeading
            ekstraHentinger={aktiveEkstrahentinger}
            label="Aktive ekstrahentinger"
            isLoading={isLoading}
            isError={isError}
            isPast={false}
        />
    );
};
