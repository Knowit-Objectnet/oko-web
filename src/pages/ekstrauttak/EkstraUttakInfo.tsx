import { VStack, Text, Box, Icon, Flex } from '@chakra-ui/react';
import React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { formatDate } from '../../utils/formatDateTime';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import Calendar from '../../assets/Calendar.svg';
import Location from '../../assets/Location.svg';
import Weight from '../../assets/Weight.svg';
import { EkstraUttakInfoRow } from './EkstraUttakInfoRow';

interface Props {
    henting: ApiEkstraHenting;
}

export const EkstraUttakInfo: React.FC<Props> = ({ henting }) => {
    return (
        <VStack alignItems="flex-start">
            <EkstraUttakInfoRow icon={<Calendar />} text={formatDate(parseISOIgnoreTimezone(henting.startTidspunkt))} />
            <EkstraUttakInfoRow icon={<Location />} text={henting.stasjonNavn} />
            {/* <EkstraUttakInfoRow
                icon={<Weight />}
                text={henting.kategorier.reduce((prev, next) => prev + next.mengde, 0) + ' kg'}
            /> */}
        </VStack>
    );
};
