import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import { Heading, HStack, Tbody, Td, Text, Tr, VStack } from '@chakra-ui/react';
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
import { KategoriList } from '../../../components/KategoriList';
import { EkstraHentingInfo } from '../../ekstrahenting/EkstraHentingInfo';

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
                            <Text fontSize="0.8rem" fontWeight="normal">
                                Registrert 20.12.12
                            </Text>
                        </HStack>
                    </Td>

                    <Td maxWidth="14rem">
                        <KategorierMedVekt vektregistreringer={henting.vektregistreringer} />
                    </Td>
                    <Td>
                        <EkstraHentingInfo henting={henting} />
                    </Td>
                    <Td>
                        <HentingButton />
                    </Td>
                </Tr>
            ))}
        </Tbody>
    );
};
