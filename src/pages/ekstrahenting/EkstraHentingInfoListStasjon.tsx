import { startOfToday } from 'date-fns';
import React from 'react';
import { useEkstraHentinger } from '../../services/henting/useEkstraHentinger';
import { dateTimeToStringIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { EkstraHentingHeading } from './EkstraHentingHeading';
import { sortedEkstraHentingerByDatoDesc } from './EkstraHentingSortedInfo';

export const EkstraHentingInfoListStasjon: React.FC = () => {
    const {
        data: ekstraHentinger,
        isLoading,
        isError,
    } = useEkstraHentinger({
        after: dateTimeToStringIgnoreTimezone(startOfToday()),
    });

    const sortedEkstraHentinger = sortedEkstraHentingerByDatoDesc(ekstraHentinger ?? []);

    return (
        <EkstraHentingHeading
            ekstraHentinger={sortedEkstraHentinger}
            label="Aktive ekstrahentinger"
            isLoading={isLoading}
            isError={isError}
            isPast={false}
        />
    );
};
