import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { DetailWithIcon } from '../../henting/components/DetailWithIcon';
import Location from '../../../assets/Location.svg';
import Calendar from '../../../assets/Calendar.svg';
import { HentingButton } from './HentingButton';
import { KunTotalvekt } from './KunTotalvekt';
import { ApiHentingParams } from '../../../services/henting/HentingService';
import { useHentinger } from '../../../services/henting/useHentinger';
import { useAuth } from '../../../auth/useAuth';
import { ApiPlanlagtHenting } from '../../../services/henting/PlanlagtHentingService';
import { ApiEkstraHenting } from '../../../services/henting/EkstraHentingService';

export const NoMissingRegistration: React.FC = () => {
    const { user } = useAuth();
    const hentingeParametere: ApiHentingParams = { aktorId: user.aktorId };
    const { data: hentinger } = useHentinger(hentingeParametere);

    //const h: Array<ApiPlanlagtHenting | ApiEkstraHenting>

    hentinger?.filter((henting) => henting.sluttTidspunkt);
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
                {/* Registrert vekt */}
                {/*<KategorierMedVekt />*/}
                {/* Totalvekt */}
                <KunTotalvekt />
                <VStack alignItems="flex-start">
                    <DetailWithIcon icon={Location} label="Stasjon">
                        Grønmo
                    </DetailWithIcon>
                    <DetailWithIcon icon={Calendar} label="Dato og tidspunk">
                        <Text>
                            {/*
                    <time>{getDayString(parseISOIgnoreTimezone(henting.startTidspunkt))}</time>
                    {` kl `}
                    <time>{formatTime(parseISOIgnoreTimezone(henting.startTidspunkt))}</time>
                    {`-`}
                    <time>{formatTime(parseISOIgnoreTimezone(henting.sluttTidspunkt))}</time>
                    */}
                            1.3.21
                            {` kl `}
                            07:00-09:00
                        </Text>
                    </DetailWithIcon>
                </VStack>
                <HentingButton />
            </HStack>
        </>
    );
};
