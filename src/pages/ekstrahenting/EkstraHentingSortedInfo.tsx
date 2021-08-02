import { compareAsc, compareDesc } from 'date-fns';
import React from 'react';
import { useAuth } from '../../auth/useAuth';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { EkstraHentingInfoListPartner } from './EkstraHentingInfoListPartner';
import { EkstraHentingInfoListAdmin } from './EkstraHentingInfoListAdmin';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { EkstraHentingInfoListStasjon } from './EkstraHentingInfoListStasjon';

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
        return <EkstraHentingInfoListAdmin />;
    }
    return <EkstraHentingInfoListStasjon />;
};
