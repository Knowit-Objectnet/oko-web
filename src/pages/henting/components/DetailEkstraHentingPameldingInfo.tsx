import { Flex, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import { PartnerPameldingInfo } from '../../ekstrahenting/PartnerPameldingInfo';
import { useAuth } from '../../../auth/useAuth';
import { ApiEkstraHenting } from '../../../services/henting/EkstraHentingService';

interface Props {
    ekstraHenting: ApiEkstraHenting;
}

export const DetailEkstraHentingPameldingInfo: React.FC<Props> = ({ ekstraHenting }) => {
    const { user } = useAuth();

    if (!ekstraHenting.godkjentUtlysning || ekstraHenting.godkjentUtlysning.partnerId !== user.aktorId) {
        return (
            <Flex backgroundColor={colors.White} height="auto" width="19rem" padding="1rem">
                <VStack>
                    <Text fontSize="sm">
                        Hvis du melder deg på gjør du at ingen andre kan melde seg på. Derfor forventes det at du kommer
                        og henter ombruksvarene innenfor tidsintervallet.
                    </Text>

                    <PartnerPameldingInfo ekstraHenting={ekstraHenting} />
                </VStack>
            </Flex>
        );
    }
    return null;
};
