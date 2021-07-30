import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { formatTime } from '../../../utils/formatDateTime';
import { parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';
import { getDayString } from '../HentingDetails';
import { DetailWithIcon } from './DetailWithIcon';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import Location from '../../../assets/Location.svg';
import Calendar from '../../../assets/Calendar.svg';
import Clock from '../../../assets/Clock.svg';
import { DetailWithLabel } from './DetailWithLabel';
import { KategoriList } from '../../../components/KategoriList';
import { colors } from '../../../theme/foundations/colors';
import { PartnerPameldingInfo } from '../../ekstrahenting/PartnerPameldingInfo';
import { useAuth } from '../../../auth/useAuth';

interface Props {
    henting: ApiHentingWrapper;
}

export const DetailInfo: React.FC<Props> = ({ henting }) => {
    const { user } = useAuth();
    return (
        <>
            <HStack alignItems="center" spacing="10" justifyContent="space-between">
                <VStack spacing="3" alignItems="flex-start" marginTop="4">
                    <DetailWithIcon icon={Calendar} label="Dato">
                        <time>{getDayString(parseISOIgnoreTimezone(henting.startTidspunkt))}</time>
                    </DetailWithIcon>
                    <DetailWithIcon icon={Clock} label="Tidspunkt">
                        {formatTime(parseISOIgnoreTimezone(henting.startTidspunkt)) +
                            ' - ' +
                            formatTime(parseISOIgnoreTimezone(henting.sluttTidspunkt))}
                    </DetailWithIcon>
                    <DetailWithIcon icon={Location} label="Stasjon">
                        {henting.stasjonNavn}
                    </DetailWithIcon>

                    {henting.planlagtHenting?.merknad ? (
                        <DetailWithLabel label="Merknad">
                            <Text>{henting.planlagtHenting?.merknad}</Text>
                        </DetailWithLabel>
                    ) : null}
                    {henting.ekstraHenting?.beskrivelse ? (
                        <DetailWithLabel label="Beskrivelse">
                            <Text>{henting.ekstraHenting?.beskrivelse}</Text>
                        </DetailWithLabel>
                    ) : null}
                    {henting.planlagtHenting && henting.planlagtHenting.kategorier.length > 0 ? (
                        <DetailWithLabel label="Kategorier">
                            <KategoriList
                                size="md"
                                kategorier={henting.planlagtHenting.kategorier.map(({ kategori }) => kategori)}
                            />
                        </DetailWithLabel>
                    ) : null}
                    {henting.ekstraHenting && henting.ekstraHenting.kategorier.length > 0 ? (
                        <DetailWithLabel label="Kategorier">
                            <KategoriList
                                size="md"
                                kategorier={henting.ekstraHenting.kategorier.map(({ kategori }) => kategori)}
                            />
                        </DetailWithLabel>
                    ) : null}
                </VStack>
                {henting.type === 'EKSTRA' && user.isPartner ? (
                    <Flex backgroundColor={colors.White} height="auto" width="19rem" padding="1rem">
                        <VStack>
                            <Text fontSize="sm">
                                Hvis du melder deg på gjør du at ingen andre kan melde seg på. Derfor forventes det at
                                du kommer og henter ombruksvarene innenfor tidsintervallet.
                            </Text>

                            {henting.ekstraHenting === undefined || henting.aktorId === undefined ? null : (
                                <PartnerPameldingInfo henting={henting.ekstraHenting} partnerId={user.aktorId!} />
                            )}
                        </VStack>
                    </Flex>
                ) : null}
            </HStack>
        </>
    );
};
