import { Box, Heading, HStack, Text } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import * as React from 'react';
import { useAuth } from '../../../auth/useAuth';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { BadgeDetail } from './BadgeDetail';
import Varsel from '../../../assets/Varsel.svg';
import { colors } from '../../../theme/foundations/colors';
import { DetailWeightInfo } from './DetailWeightInfo';

interface Props {
    henting: ApiHentingWrapper;
}

export const DetailHeader: React.FC<Props> = ({ henting }) => {
    const { user } = useAuth();

    return (
        <>
            <HStack alignItems="center" spacing="10">
                {henting.planlagtHenting ? (
                    <Heading as="h1" fontSize="xl" aria-label="Partner">
                        {user.isPartner ? `Din henting hos ${henting.stasjonNavn}` : henting.aktorNavn}
                    </Heading>
                ) : (
                    <>
                        {user.isPartner ? (
                            henting.ekstraHenting?.godkjentUtlysning?.partnerId === user.aktorId ? (
                                <>
                                    <Heading as="h1" fontSize="xl" aria-label="Partner">
                                        {`Din henting hos ${henting.stasjonNavn}`}
                                    </Heading>
                                    <BadgeDetail text="Ekstrahenting" color={colors.Green} minWidth="4xs" />
                                </>
                            ) : (
                                <Heading as="h1" fontWeight="bold" aria-label="Partner" fontSize="lg">
                                    <HStack>
                                        <Icon as={Varsel} transform="translateY(-2px)" boxSize="4rem" />
                                        <Box>
                                            <Text>Ekstrahenting på {henting.stasjonNavn}</Text>
                                        </Box>
                                    </HStack>
                                </Heading>
                            )
                        ) : (
                            <>
                                {henting.ekstraHenting?.godkjentUtlysning ? (
                                    <>
                                        <Heading as="h1" fontWeight="normal" aria-label="Partner">
                                            {henting.ekstraHenting.godkjentUtlysning.partnerNavn}
                                        </Heading>
                                        <BadgeDetail text="Ekstrahenting" color={colors.Green} minWidth="4xs" />
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

                <DetailWeightInfo henting={henting} />
            </HStack>
        </>
    );
};
