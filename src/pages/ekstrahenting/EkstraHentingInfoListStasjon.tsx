import { startOfToday } from 'date-fns';
import React from 'react';
import { useEkstraHentingerWithUtlysning } from '../../services/henting/useEkstraHentingerWithUtlysning';
import { dateTimeToStringIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { EkstraHentingHeading } from './EkstraHentingHeading';
import { sortedEkstraHentingerByDatoDesc } from './EkstraHentingSortedInfo';

export const EkstraHentingInfoListStasjon: React.FC = () => {
    const { data: ekstraHentinger } = useEkstraHentingerWithUtlysning({
        after: dateTimeToStringIgnoreTimezone(startOfToday()),
    });

    const sortedEkstraHentinger = sortedEkstraHentingerByDatoDesc(ekstraHentinger ?? []);

    return <EkstraHentingHeading ekstraHentinger={sortedEkstraHentinger} label="Aktive ekstrahentinger" />;
};
