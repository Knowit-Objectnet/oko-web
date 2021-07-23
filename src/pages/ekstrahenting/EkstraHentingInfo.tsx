import { VStack } from '@chakra-ui/react';
import React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { formatDateRelative, formatTime } from '../../utils/formatDateTime';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import Calendar from '../../assets/Calendar.svg';
import Clock from '../../assets/Clock.svg';
import Location from '../../assets/Location.svg';
import { EkstraHentingInfoRow } from './EkstraHentingInfoRow';
import { ApiHenting } from '../../services/henting/HentingService';

interface Props {
    henting: ApiEkstraHenting | ApiHenting;
}

export const EkstraHentingInfo: React.FC<Props> = ({ henting }) => {
    return (
        <VStack alignItems="flex-start">
            <EkstraHentingInfoRow
                icon={<Calendar />}
                text={formatDateRelative(parseISOIgnoreTimezone(henting.startTidspunkt))}
            />
            <EkstraHentingInfoRow
                icon={<Clock />}
                text={
                    formatTime(parseISOIgnoreTimezone(henting.startTidspunkt)) +
                    ' - ' +
                    formatTime(parseISOIgnoreTimezone(henting.sluttTidspunkt))
                }
            />
            <EkstraHentingInfoRow icon={<Location />} text={henting.stasjonNavn} />
        </VStack>
    );
};
