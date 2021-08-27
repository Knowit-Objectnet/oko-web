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

    if (!ekstraHenting.godkjentUtlysning || ekstraHenting.godkjentUtlysning.partnerId === user.aktorId) {
        return (
            <Flex
                backgroundColor={colors.White}
                padding="4"
                marginTop="4"
                marginLeft={{
                    base: '0rem',
                    desktop: '6',
                }}
                direction="column"
                align="center"
                width={{ base: '100%', desktop: '40%' }}
                height="min-content"
            >
                <Text fontSize="sm">
                    Hvis du melder deg på gjør du at ingen andre kan melde seg på. Derfor forventes det at du kommer og
                    henter ombruksvarene innenfor tidsintervallet.
                </Text>

                <PartnerPameldingInfo ekstraHenting={ekstraHenting} />
            </Flex>
        );
    }
    return null;
};
