import { VStack } from '@chakra-ui/react';
import React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { formatDateTime } from '../../utils/formatDateTime';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import Calendar from '../../assets/Calendar.svg';
import Location from '../../assets/Location.svg';
import { EkstraHentingInfoRow } from './EkstraHentingInfoRow';

interface Props {
    henting: ApiEkstraHenting;
}

export const EkstraHentingInfo: React.FC<Props> = ({ henting }) => {
    return (
        <VStack alignItems="flex-start">
            <EkstraHentingInfoRow
                icon={<Calendar />}
                text={formatDateTime(parseISOIgnoreTimezone(henting.startTidspunkt))}
            />
            <EkstraHentingInfoRow icon={<Location />} text={henting.stasjonNavn} />
            {/* <EkstraHentingInfoRow
                icon={<Weight />}
                text={henting.kategorier.reduce((prev, next) => prev + next.mengde, 0) + ' kg'}
            /> */}
        </VStack>
    );
};
