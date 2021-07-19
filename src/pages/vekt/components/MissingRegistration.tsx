import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { DetailWithIcon } from '../../henting/components/DetailWithIcon';
import Location from '../../../assets/Location.svg';
import Calendar from '../../../assets/Calendar.svg';
import { RegistervektButton } from './RegistervektButton';
import { KategoriBadge } from './KategoriBadge';
import { ApiHenting } from '../../../services/henting/HentingService';
import { parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';
import { formatTime } from '../../../utils/formatDateTime';
import { getDayString } from '../../henting/HentingDetails';

interface Props {
    henting: ApiHenting;
}

export const MissingRegistration: React.FC<Props> = ({ henting }) => (
    <>
        <HStack
            justifyContent="space-between"
            alignItems="center"
            paddingX={6}
            paddingY={4}
            backgroundColor={colors.Red}
            marginTop={4}
            spacing={20}
        >
            <Heading fontSize="1.5rem" fontWeight="bold" textAlign="center">
                Ikke registrert vekt
            </Heading>
            <HStack>
                {henting.kategorier.map((kategori) => {
                    return <KategoriBadge key={kategori.kategori.id} name={kategori.kategori.navn} />;
                })}
            </HStack>
            <VStack alignItems="flex-start">
                <DetailWithIcon icon={Location} label="Stasjon">
                    {henting.stasjonNavn}
                </DetailWithIcon>
                <DetailWithIcon icon={Calendar} label="Dato og tidspunk">
                    <Text>
                        <time>{getDayString(parseISOIgnoreTimezone(henting.startTidspunkt))}</time>
                        {` kl `}
                        <time>{formatTime(parseISOIgnoreTimezone(henting.startTidspunkt))}</time>-
                        <time>{formatTime(parseISOIgnoreTimezone(henting.sluttTidspunkt))}</time>
                    </Text>
                </DetailWithIcon>
            </VStack>
            <RegistervektButton henting={henting} />
        </HStack>
    </>
);
