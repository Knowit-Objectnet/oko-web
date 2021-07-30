import { Accordion } from '@chakra-ui/react';
import { compareAsc, compareDesc, isFuture, isPast, parseISO } from 'date-fns';
import React from 'react';
import { useAuth } from '../../auth/useAuth';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { useEkstraHentingerWithUtlysning } from '../../services/henting/useEkstraHentingerWithUtlysning';
import { EkstraHentingInfoListPartner } from './EkstraHentingInfoListPartner';
import { EkstraHentingInfoListAdmin } from './EkstraHentingInfoListAdmin';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';

export const sortedEkstraHentingerByDatoDesc = (ekstraHentinger: ApiEkstraHenting[]): ApiEkstraHenting[] => {
    return ekstraHentinger.sort((ekstraHentingA, ekstraHentingB) =>
        compareDesc(
            parseISOIgnoreTimezone(ekstraHentingB.startTidspunkt),
            parseISOIgnoreTimezone(ekstraHentingA.startTidspunkt),
        ),
    );
};

export const sortedEkstraHentingerByDatoAsc = (ekstraHentinger: ApiEkstraHenting[]): ApiEkstraHenting[] => {
    return ekstraHentinger.sort((ekstraHentingA, ekstraHentingB) =>
        compareAsc(
            parseISOIgnoreTimezone(ekstraHentingB.startTidspunkt),
            parseISOIgnoreTimezone(ekstraHentingA.startTidspunkt),
        ),
    );
};

export const EkstraHentingSortedInfo: React.FC = () => {
    const { user } = useAuth();
    if (user.isPartner) {
        return <EkstraHentingInfoListPartner />;
    }
    if (user.isAdmin) {
        return (
            <Accordion allowToggle borderColor="transparent">
                <EkstraHentingInfoListAdmin />
            </Accordion>
        );
    }
    return null;
};
