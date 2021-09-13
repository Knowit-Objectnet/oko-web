import { Accordion } from '@chakra-ui/react';
import React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { useEkstraHentinger } from '../../services/henting/useEkstraHentinger';
import { partition } from 'lodash';
import { isFuture } from 'date-fns';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { sortedEkstraHentingerByDatoAsc, sortedEkstraHentingerByDatoDesc } from './EkstraHentingSortedInfo';
import { EkstraHentingHeading } from './EkstraHentingHeading';
import { EkstraHentingAccordion } from './EkstraHentingAccordion';

export const EkstraHentingInfoListAdmin: React.FC = () => {
    const { data: ekstraHentinger, isLoading, isError } = useEkstraHentinger();

    const [aktiveEkstraHentinger, tidligereEkstraHentinger] = partition<ApiEkstraHenting>(
        ekstraHentinger,
        (ekstraHenting) => isFuture(parseISOIgnoreTimezone(ekstraHenting.sluttTidspunkt)),
    );
    const sortedTidligereEkstraHentinger = sortedEkstraHentingerByDatoAsc(tidligereEkstraHentinger);
    const sortedAktiveEkstraHentinger = sortedEkstraHentingerByDatoDesc(aktiveEkstraHentinger);

    return (
        <Accordion allowToggle borderColor="transparent" allowMultiple>
            <EkstraHentingHeading
                ekstraHentinger={sortedAktiveEkstraHentinger}
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
