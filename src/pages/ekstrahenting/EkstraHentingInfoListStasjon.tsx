import { Accordion } from '@chakra-ui/react';
import { isFuture, isPast, startOfToday, subWeeks } from 'date-fns';
import React from 'react';
import { useEkstraHentinger } from '../../services/henting/useEkstraHentinger';
import { dateTimeToStringIgnoreTimezone, parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { EkstraHentingHeading } from './EkstraHentingHeading';
import { sortedEkstraHentingerByDatoDesc } from './EkstraHentingSortedInfo';
import { EkstraHentingAccordion } from './EkstraHentingAccordion';

export const EkstraHentingInfoListStasjon: React.FC = () => {
    const {
        data: ekstraHentinger,
        isLoading,
        isError,
    } = useEkstraHentinger({
        after: dateTimeToStringIgnoreTimezone(subWeeks(startOfToday(), 1)),
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
