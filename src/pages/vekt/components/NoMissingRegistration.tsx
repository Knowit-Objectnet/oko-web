import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { DetailWithIcon } from '../../henting/components/DetailWithIcon';
import Location from '../../../assets/Location.svg';
import Calendar from '../../../assets/Calendar.svg';
import { HentingButton } from './HentingButton';
import { KunTotalvekt } from './KunTotalvekt';
import { ApiHenting } from '../../../services/henting/HentingService';
import { KategorierMedVekt } from './KategorierMedVekt';
import { getDayString } from '../../henting/HentingDetails';
import { parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';
import { formatTime } from '../../../utils/formatDateTime';

interface Props {
    henting: ApiHenting;
}

export const NoMissingRegistration: React.FC<Props> = ({ henting }) => {
    return (
        <>
            <HStack
                justifyContent="space-between"
                alignItems="center"
                paddingX={6}
                paddingY={4}
                backgroundColor={colors.LightBeige}
                marginTop={4}
                spacing={20}
            >
                <HStack alignItems="center" spacing={4}>
                    <Heading fontSize="1.5rem" fontWeight="bold" textAlign="center">
                        104 tonn
                    </Heading>
                    <Text fontSize="0.8rem" fontWeight="normal">
                        Registrert 20.12.12
                    </Text>
                </HStack>
                <KategorierMedVekt vektregistreringer={henting.vektregistreringer} />
                {/* Registrert vekt */}
                {/*<KunTotalvekt />*/}
                {/* Totalvekt */}
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
                <HentingButton />
            </HStack>
        </>
    );
};
