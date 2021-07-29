import * as React from 'react';
import { Box, Button, ButtonGroup, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { hentingStarted } from '../../utils/hentingDateTimeHelpers';
import { KategoriList } from '../../components/KategoriList';
import { CancelPlanlagtHentingButton } from './components/CancelPlanlagtHentingButton';
import Check from '../../assets/Check.svg';
import Varsel from '../../assets/Varsel.svg';
import { useAuth } from '../../auth/useAuth';
import { DetailWithLabel } from '../../components/henting/DetailWithLabel';
import { AvlystDetails } from './components/AvlystDetails';
import { BadgeDetail } from './components/BadgeDetail';
import { RegisterVektButton } from './components/RegisterVektButton';
import { colors } from '../../theme/foundations/colors';
import { ApiHenting, ApiHentingWrapper } from '../../services/henting/HentingService';
import { useHentingById } from '../../services/henting/useHentingById';
import { PartnerPameldingInfo } from '../ekstrahenting/PartnerPameldingInfo';
import { HentingTimeLocation } from '../../components/henting/HentingTimeLocation';
import { Flex } from '@chakra-ui/layout';

interface Props {
    hentingId: string;
}

export const HentingDetails: React.FC<Props> = ({ hentingId }) => {
    const { user } = useAuth();
    const { state: locationState } = useLocation<{ henting?: ApiHentingWrapper; prevPath?: string }>();

    const hentingQuery = useHentingById(hentingId, {
        initialData: locationState?.henting,
    });

    const getBackButton = () => {
        if (locationState?.prevPath) {
            return (
                <Button as={Link} to={locationState.prevPath} variant="outline">
                    Tilbake
                </Button>
            );
        }
    };

    const getCancelButton = (henting: ApiHentingWrapper) => {
        if (!henting.planlagtHenting?.avlyst && userCanCancelHenting(henting)) {
            return <CancelPlanlagtHentingButton henting={henting.planlagtHenting!} variant="outline" />;
        }
    };

    const userCanCancelHenting = (henting: ApiHentingWrapper) => {
        const aktorUserOwnsHenting = henting.aktorId && user.ownsResource(henting.aktorId);
        const stasjonUserOwnsHenting = user.ownsResource(henting.stasjonId);
        return user.isAdmin || aktorUserOwnsHenting || stasjonUserOwnsHenting;
    };

    // TODO: create better UI for loading and error states
    return hentingQuery.dispatch<React.ReactElement | null>(
        () => null,
        () => <>Vennligst vent...</>,
        () => <>Klarte dessverre ikke å finne informasjon for denne hentingen</>,
        (hentingWrapper) => {
            const henting: ApiHenting | undefined = hentingWrapper.planlagtHenting || hentingWrapper.ekstraHenting;
            if (!henting) return <>Klarte dessverre ikke å finne informasjon for denne hentingen</>;
            return (
                <>
                    {hentingWrapper.planlagtHenting?.avlyst && hentingWrapper.planlagtHenting?.avlystAv ? (
                        <AvlystDetails
                            id={hentingWrapper.planlagtHenting.avlystAv}
                            aarsakId={hentingWrapper.planlagtHenting?.aarsakId}
                            mb="1em"
                        />
                    ) : null}

                    <HStack alignItems="center" spacing="10">
                        {hentingWrapper.type === 'PLANLAGT' ? (
                            <Heading as="h1" fontWeight="normal" aria-label="Partner">
                                {hentingWrapper.aktorNavn}
                            </Heading>
                        ) : (
                            <>
                                {user.isPartner ? (
                                    <Heading as="h1" fontWeight="bold" aria-label="Partner" fontSize="lg">
                                        <HStack>
                                            <Icon as={Varsel} transform="translateY(-2px)" boxSize="4rem" />
                                            <Box>
                                                <Text>
                                                    Ekstrahenting på {hentingWrapper.ekstraHenting?.stasjonNavn}
                                                </Text>
                                            </Box>
                                        </HStack>
                                    </Heading>
                                ) : (
                                    <>
                                        {hentingWrapper.ekstraHenting ? (
                                            hentingWrapper.ekstraHenting.godkjentUtlysning ? (
                                                <>
                                                    <Heading as="h1" fontWeight="normal" aria-label="Partner">
                                                        {hentingWrapper.ekstraHenting.godkjentUtlysning.partnerNavn}
                                                    </Heading>
                                                    <BadgeDetail
                                                        text="Ekstrahenting"
                                                        color={colors.Green}
                                                        minWidth="4xs"
                                                    />{' '}
                                                </>
                                            ) : (
                                                <>
                                                    <Heading as="h1" fontWeight="normal" aria-label="Partner">
                                                        Ekstrahenting
                                                    </Heading>
                                                    <BadgeDetail
                                                        text="Ekstrahenting"
                                                        color={colors.Green}
                                                        minWidth="4xs"
                                                    />
                                                    <BadgeDetail
                                                        text="Ingen påmeldte"
                                                        color={colors.Red}
                                                        minWidth="4xs"
                                                    />
                                                </>
                                            )
                                        ) : undefined}
                                    </>
                                )}
                            </>
                        )}

                        {hentingWrapper.planlagtHenting ? (
                            henting.vektregistreringer.length > 0 ? (
                                <>
                                    <BadgeDetail text="Vekt er registrert" iconLeft={Check} color={colors.LightGreen} />
                                </>
                            ) : (
                                <>
                                    <BadgeDetail text="Vekt mangler" color={colors.Red} />
                                    {hentingStarted(henting) ? (
                                        <RegisterVektButton henting={hentingWrapper.planlagtHenting!} />
                                    ) : null}
                                </>
                            )
                        ) : null}
                    </HStack>
                    <HStack alignItems="center" spacing="10" justifyContent="space-between">
                        <VStack spacing="3" alignItems="flex-start" marginTop="4">
                            <HentingTimeLocation henting={hentingWrapper} />

                            {hentingWrapper.planlagtHenting?.merknad ? (
                                <DetailWithLabel label="Merknad">
                                    <Text>{hentingWrapper.planlagtHenting?.merknad}</Text>
                                </DetailWithLabel>
                            ) : null}
                            {hentingWrapper.ekstraHenting?.beskrivelse ? (
                                <DetailWithLabel label="Beskrivelse">
                                    <Text>{hentingWrapper.ekstraHenting?.beskrivelse}</Text>
                                </DetailWithLabel>
                            ) : null}
                            {hentingWrapper.planlagtHenting && hentingWrapper.planlagtHenting.kategorier.length > 0 ? (
                                <DetailWithLabel label="Kategorier">
                                    <KategoriList
                                        kategorier={hentingWrapper.planlagtHenting.kategorier.map(
                                            ({ kategori }) => kategori,
                                        )}
                                    />
                                </DetailWithLabel>
                            ) : null}
                            {hentingWrapper.ekstraHenting && hentingWrapper.ekstraHenting.kategorier.length > 0 ? (
                                <DetailWithLabel label="Kategorier">
                                    <KategoriList
                                        kategorier={hentingWrapper.ekstraHenting.kategorier.map(
                                            ({ kategori }) => kategori,
                                        )}
                                    />
                                </DetailWithLabel>
                            ) : null}
                        </VStack>
                        {hentingWrapper.type === 'EKSTRA' && user.isPartner ? (
                            <Flex backgroundColor={colors.White} height="auto" width="19rem" padding="1rem">
                                <VStack>
                                    <Text fontSize="sm">
                                        Hvis du melder deg på gjør du at ingen andre kan melde seg på. Derfor forventes
                                        det at du kommer og henter ombruksvarene innenfor tidsintervallet.
                                    </Text>

                                    {hentingWrapper.ekstraHenting === undefined ||
                                    hentingWrapper.aktorId === undefined ? null : (
                                        <PartnerPameldingInfo
                                            henting={hentingWrapper.ekstraHenting}
                                            partnerId={user.aktorId!}
                                        />
                                    )}
                                </VStack>
                            </Flex>
                        ) : null}
                    </HStack>
                    <ButtonGroup marginTop="10">
                        {getBackButton()}
                        {hentingWrapper.type === 'PLANLAGT' && user.isPartner ? getCancelButton(hentingWrapper) : null}
                    </ButtonGroup>
                </>
            );
        },
    );
};
