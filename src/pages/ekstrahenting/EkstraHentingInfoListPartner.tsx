import { Accordion } from '@chakra-ui/react';
import { isFuture, startOfToday } from 'date-fns';
import { partition } from 'lodash';
import React from 'react';
import { useAuth } from '../../auth/useAuth';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { useEkstraHentingerWithUtlysning } from '../../services/henting/useEkstraHentingerWithUtlysning';
import { dateTimeToStringIgnoreTimezone, parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { EkstraHentingAccordion } from './EkstraHentingAccordion';
import { EkstraHentingHeading } from './EkstraHentingHeading';
import { sortedEkstraHentingerByDatoDesc } from './EkstraHentingSortedInfo';

export const EkstraHentingInfoListPartner: React.FC = () => {
    const { user } = useAuth();

    const {
        data: ekstraHentinger,
        isLoading,
        isError,
    } = useEkstraHentingerWithUtlysning({
        after: dateTimeToStringIgnoreTimezone(startOfToday()),
    });

    const sortedEkstraHentinger = sortedEkstraHentingerByDatoDesc(ekstraHentinger ?? []);

    const [paameldteEkstraHentinger, tilbudteEkstraHentinger] = partition<ApiEkstraHenting>(
        sortedEkstraHentinger,
        (ekstraHenting) => ekstraHenting.godkjentUtlysning?.partnerId == user.aktorId,
    );

    const dineKommendeEkstraHentinger = paameldteEkstraHentinger.filter((ekstraHenting) =>
        isFuture(parseISOIgnoreTimezone(ekstraHenting.sluttTidspunkt)),
    );

    const [ikkePaameldteEkstraHentinger, kanIkkeMeldePaaEkstraHentinger] = partition<ApiEkstraHenting>(
        tilbudteEkstraHentinger,
        (ekstraHenting) =>
            !ekstraHenting.godkjentUtlysning && isFuture(parseISOIgnoreTimezone(ekstraHenting.sluttTidspunkt)),
    );

    return (
        <Accordion allowToggle borderColor="transparent" allowMultiple>
            <EkstraHentingHeading
                ekstraHentinger={ikkePaameldteEkstraHentinger}
                label="Aktive ekstrahentinger"
                isLoading={isLoading}
                isError={isError}
            />
            <EkstraHentingHeading
                ekstraHentinger={dineKommendeEkstraHentinger}
                label="Dine kommende ekstrahentinger"
                isLoading={isLoading}
                isError={isError}
            />
            <EkstraHentingAccordion
                ekstraHentinger={kanIkkeMeldePaaEkstraHentinger}
                label="Utgåtte ekstrahentinger"
                isLoading={isLoading}
                isError={isError}
            />
        </Accordion>
    );
};
