import { Accordion } from '@chakra-ui/react';
import { compareDesc, isFuture, isPast, parseISO } from 'date-fns';
import React from 'react';
import { useAuth } from '../../auth/useAuth';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { useEkstraHentingerWithUtlysning } from '../../services/henting/useEkstraHentingerWithUtlysning';
import { EkstraHentingInfoListPartner } from './EkstraHentingInfoListPartner';
import { EkstraHentingInfoList } from './EkstraHentingInfoList';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';

//Usikker på om denne filtrerer også på DateTime og ikke kun date
export const sortedEkstraHentingerByDato = (ekstraHentinger: ApiEkstraHenting[]): ApiEkstraHenting[] => {
    return (ekstraHentinger ?? []).sort((ekstraHentingA, ekstraHentingB) =>
        compareDesc(parseISO(ekstraHentingB.startTidspunkt), parseISO(ekstraHentingA.startTidspunkt)),
    );
};

export const EkstraHentingSortedInfo: React.FC = () => {
    const { user } = useAuth();

    const { data: ekstraHentinger } = useEkstraHentingerWithUtlysning({});

    const sortedEkstraHentinger = sortedEkstraHentingerByDato(ekstraHentinger ?? []);

    const getAktiveEkstrahentinger = sortedEkstraHentinger.filter((ekstraHenting) =>
        isFuture(parseISO(ekstraHenting.startTidspunkt)),
    );
    const getTidligereEkstraHentinger = sortedEkstraHentinger
        .filter((ekstraHenting) => isPast(parseISO(ekstraHenting.sluttTidspunkt)))
        .reverse();
    const getDineKommendeEkstraHentinger = getAktiveEkstrahentinger.filter(
        (ekstraHenting) => ekstraHenting.godkjentUtlysning?.partnerId == user.aktorId,
    );

    const getAktiveEkstraHentingerPartner = getAktiveEkstrahentinger
        .filter(
            (ekstraHenting) =>
                !ekstraHenting.godkjentUtlysning && !isPast(parseISOIgnoreTimezone(ekstraHenting.sluttTidspunkt)),
        )
        .concat(
            getAktiveEkstrahentinger.filter(
                (ekstraHenting) =>
                    (ekstraHenting.godkjentUtlysning && ekstraHenting.godkjentUtlysning?.partnerId !== user.aktorId) ||
                    (!ekstraHenting.godkjentUtlysning && isPast(parseISOIgnoreTimezone(ekstraHenting.sluttTidspunkt))),
            ),
        );
    if (user.isPartner) {
        return (
            <EkstraHentingInfoListPartner
                dineKommendeEkstraHentinger={getDineKommendeEkstraHentinger}
                aktiveEkstraHentinger={getAktiveEkstraHentingerPartner}
            />
        );
    } else {
        return (
            <Accordion allowToggle borderColor="transparent">
                <EkstraHentingInfoList
                    aktiveEkstraHentinger={getAktiveEkstrahentinger}
                    tidligereEkstraHentinger={getTidligereEkstraHentinger}
                />
            </Accordion>
        );
    }
};
