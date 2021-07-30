import { Flex, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import { PartnerPameldingInfo } from '../../ekstrahenting/PartnerPameldingInfo';
import { useAuth } from '../../../auth/useAuth';
import { ApiEkstraHenting } from '../../../services/henting/EkstraHentingService';

interface Props {
    henting: ApiEkstraHenting;
}

export const DetailExtraRegistrationInfo: React.FC<Props> = ({ henting }) => {
    const { user } = useAuth();
    return (
        <>
            {henting && user.isPartner ? (
                henting.godkjentUtlysning?.partnerId !== user.aktorId || !henting.godkjentUtlysning ? (
                    <Flex backgroundColor={colors.White} height="auto" width="19rem" padding="1rem">
                        <VStack>
                            <Text fontSize="sm">
                                Hvis du melder deg på gjør du at ingen andre kan melde seg på. Derfor forventes det at
                                du kommer og henter ombruksvarene innenfor tidsintervallet.
                            </Text>

                            <PartnerPameldingInfo henting={henting} partnerId={user.aktorId!} />
                        </VStack>
                    </Flex>
                ) : null
            ) : null}
        </>
    );
};
