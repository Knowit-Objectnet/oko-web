import { Box, Heading, HStack, Text } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import * as React from 'react';
import { useAuth } from '../../../auth/useAuth';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { BadgeDetail } from './BadgeDetail';
import Varsel from '../../../assets/Varsel.svg';
import Check from '../../../assets/Check.svg';
import { colors } from '../../../theme/foundations/colors';
import { RegisterVektButton } from './RegisterVektButton';
import { hentingStarted } from '../../../utils/hentingDateTimeHelpers';

interface Props {
    henting: ApiHentingWrapper;
}

export const DetailHeader: React.FC<Props> = ({ henting }) => {
    const { user } = useAuth();

    return (
        <>
            <HStack alignItems="center" spacing="10">
                {henting.planlagtHenting ? (
                    <Heading as="h1" fontWeight="normal" aria-label="Partner">
                        {user.isPartner ? `Din henting hos ${henting.stasjonNavn}` : henting.aktorNavn}
                    </Heading>
                ) : (
                    <>
                        {user.isPartner ? (
                            <Heading as="h1" fontWeight="bold" aria-label="Partner" fontSize="lg">
                                <HStack>
                                    <Icon as={Varsel} transform="translateY(-2px)" boxSize="4rem" />
                                    <Box>
                                        <Text>Ekstrahenting på {henting.stasjonNavn}</Text>
                                    </Box>
                                </HStack>
                            </Heading>
                        ) : (
                            <>
                                {henting.ekstraHenting?.godkjentUtlysning ? (
                                    <>
                                        <Heading as="h1" fontWeight="normal" aria-label="Partner">
                                            {henting.ekstraHenting.godkjentUtlysning.partnerNavn}
                                        </Heading>
                                        <BadgeDetail text="Ekstrahenting" color={colors.Green} minWidth="4xs" />{' '}
                                    </>
                                ) : (
                                    <>
                                        <Heading as="h1" fontWeight="normal" aria-label="Partner">
                                            Ekstrahenting
                                        </Heading>
                                        <BadgeDetail text="Ekstrahenting" color={colors.Green} minWidth="4xs" />
                                        <BadgeDetail text="Ingen påmeldte" color={colors.Red} minWidth="4xs" />
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}

                {(henting.planlagtHenting && henting.planlagtHenting.vektregistreringer.length > 0) ||
                (henting.ekstraHenting && henting.ekstraHenting?.vektregistreringer.length > 0) ? (
                    <>
                        <BadgeDetail text="Vekt er registrert" iconLeft={Check} color={colors.LightGreen} />
                    </>
                ) : (
                    <>
                        <BadgeDetail text="Vekt mangler" color={colors.Red} />
                        {hentingStarted(henting.planlagtHenting || henting.ekstraHenting) ? (
                            <RegisterVektButton henting={henting.planlagtHenting!} />
                        ) : null}
                    </>
                )}
            </HStack>
        </>
    );
};
