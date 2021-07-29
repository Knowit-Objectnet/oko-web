import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import { Heading, HStack, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { HentingButton } from './HentingButton';
import { ApiHenting } from '../../../services/henting/HentingService';
import { KategorierMedVekt } from './KategorierMedVekt';
import { formatDate } from '../../../utils/formatDateTime';
import { parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';
import { HentingInfoSection } from '../../../components/henting/HentingInfoSection';

interface Props {
    henting: ApiHenting;
}

export const NoMissingRegistration: React.FC<Props> = ({ henting }) => {
    return (
        <Tbody>
            {henting.kategorier.map((kategori) => (
                <Tr
                    key={kategori.kategori.id}
                    backgroundColor={colors.LightBeige}
                    borderBottomWidth="16px"
                    borderBottomColor="background"
                >
                    <Td>
                        <HStack alignItems="center" spacing={4}>
                            <Heading fontSize="1.5rem" fontWeight="bold" textAlign="center">
                                {henting.vektregistreringer.reduce((total, next) => total + next.vekt, 0)} kg
                            </Heading>
                            {henting.vektregistreringer.length > 0 ? (
                                <Text fontSize="0.8rem" fontWeight="normal">
                                    Registrert:{' '}
                                    {formatDate(
                                        parseISOIgnoreTimezone(henting.vektregistreringer[0].registreringsDato),
                                    )}
                                </Text>
                            ) : null}
                        </HStack>
                    </Td>

                    <Td maxWidth="14rem">
                        <KategorierMedVekt vektregistreringer={henting.vektregistreringer} />
                    </Td>
                    <Td>
                        <HentingInfoSection henting={henting} />
                    </Td>
                    <Td>
                        <HentingButton />
                    </Td>
                </Tr>
            ))}
        </Tbody>
    );
};
