import { Accordion } from '@chakra-ui/react';
import { isFuture, isPast, startOfToday, startOfWeek } from 'date-fns';
import React from 'react';
import { useEkstraHentingerWithUtlysning } from '../../services/henting/useEkstraHentingerWithUtlysning';
import { dateTimeToStringIgnoreTimezone, parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { EkstraHentingHeading } from './EkstraHentingHeading';
import { sortedEkstraHentingerByDatoDesc } from './EkstraHentingSortedInfo';
import { EkstraHentingAccordion } from './EkstraHentingAccordion';

export const EkstraHentingInfoListStasjon: React.FC = () => {
    const {
        data: ekstraHentinger,
        isLoading,
        isError,
    } = useEkstraHentingerWithUtlysning({
        after: dateTimeToStringIgnoreTimezone(startOfWeek(startOfToday())),
    });

    const sortedEkstraHentinger = sortedEkstraHentingerByDatoDesc(ekstraHentinger ?? []);

    const aktiveEkstrahentinger = sortedEkstraHentinger.filter((ekstraHentinger) =>
        isFuture(parseISOIgnoreTimezone(ekstraHentinger.sluttTidspunkt)),
    );
    const sortedTidligereEkstraHentinger = sortedEkstraHentinger.filter((ekstraHentinger) =>
        isPast(parseISOIgnoreTimezone(ekstraHentinger.sluttTidspunkt)),
    );

    return (
        <Accordion allowToggle borderColor="transparent" allowMultiple>
            <EkstraHentingHeading
                ekstraHentinger={aktiveEkstrahentinger}
                label="Aktive ekstrahentinger"
                isLoading={isLoading}
                isError={isError}
                isPast={false}
            />
            <EkstraHentingAccordion
                ekstraHentinger={sortedTidligereEkstraHentinger}
                label="Tidligere ekstrahentinger"
                isLoading={isLoading}
                isError={isError}
                isPast={true}
            />
        </Accordion>
    );
};
