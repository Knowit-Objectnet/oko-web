import * as React from 'react';
import { ApiHentingWrapper } from '../../services/henting/HentingService';
import { VStack } from '@chakra-ui/react';
import { DetailWithIcon } from './DetailWithIcon';
import { isToday } from 'date-fns';
import { formatDate, formatTime } from '../../utils/formatDateTime';
import Calendar from '../../assets/Calendar.svg';
import Clock from '../../assets/Clock.svg';
import Location from '../../assets/Location.svg';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';

export const getDayString = (date: Date): string => {
    if (isToday(date)) {
        return 'I dag';
    }
    return formatDate(date);
};

interface Props {
    henting: ApiHentingWrapper | ApiEkstraHenting;
}

export const HentingTimeLocation: React.FC<Props> = ({ henting }) => (
    <VStack alignItems="flex-start">
        <DetailWithIcon icon={Calendar} label="Dato">
            <time>{getDayString(parseISOIgnoreTimezone(henting.startTidspunkt))}</time>
        </DetailWithIcon>
        <DetailWithIcon icon={Clock} label="Tidspunkt">
            {formatTime(parseISOIgnoreTimezone(henting.startTidspunkt)) +
                '–' +
                formatTime(parseISOIgnoreTimezone(henting.sluttTidspunkt))}
        </DetailWithIcon>
        <DetailWithIcon icon={Location} label="Stasjon">
            {henting.stasjonNavn}
        </DetailWithIcon>
    </VStack>
);
