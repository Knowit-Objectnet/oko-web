import { VStack } from '@chakra-ui/react';
import React from 'react';
import { ApiHenting } from '../../services/henting/HentingService';
import Calendar from '../../assets/Calendar.svg';
import Clock from '../../assets/Clock.svg';
import Location from '../../assets/Location.svg';
import { HentingInfoRow } from './HentingInfoRow';
import { formatDateRelative, formatTime } from '../../utils/formatDateTime';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';

interface Props {
    henting: ApiHenting;
}

export const HentingInfoSection: React.FC<Props> = ({ henting }) => {
    return (
        <VStack alignItems="flex-start">
            <HentingInfoRow
                icon={<Calendar />}
                text={formatDateRelative(parseISOIgnoreTimezone(henting.startTidspunkt))}
            />
            <HentingInfoRow
                icon={<Clock />}
                text={
                    formatTime(parseISOIgnoreTimezone(henting.startTidspunkt)) +
                    ' - ' +
                    formatTime(parseISOIgnoreTimezone(henting.sluttTidspunkt))
                }
            />
            <HentingInfoRow icon={<Location />} text={henting.stasjonNavn} />
        </VStack>
    );
};
