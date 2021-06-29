import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Flex } from '@chakra-ui/layout';
import { ApiPlanlagtHenting } from '../../services/henting/HentingService';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { usePlanlagtHentingById } from '../../services/henting/usePlanlagtHentingById';
import { formatDate, formatTime } from '../../utils/formatDateTime';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { KategoriList } from '../../components/KategoriList';
import { HStack, Icon, VStack, Badge, VisuallyHidden, Heading, Text, ButtonGroup, Button } from '@chakra-ui/react';
import { isToday } from 'date-fns';
import Calendar from '../../assets/Calendar.svg';
import Clock from '../../assets/Clock.svg';
import Location from '../../assets/Location.svg';
import ArrowLeft from '../../assets/ArrowLeft.svg';
import Warning from '../../assets/Warning.svg';
import { CancelPlanlagtHentingButton } from './CancelPlanlagtHentingButton';
import { RouterLink } from '../../routing/RouterLink';

const getDayString = (date: Date) => {
    if (isToday(date)) {
        return 'I dag';
    }
    return formatDate(date);
};

export const AvlystBadge: React.FC = () => (
    <Badge
        as={Flex}
        variant="solid"
        backgroundColor="warning"
        color="onWarning"
        fontSize="0.8rem"
        paddingY="0.5"
        paddingX="1.5"
        borderRadius={0}
    >
        <Icon as={Warning} transform="translateY(-2px)" /> Avlyst
    </Badge>
);

const IconLabel: React.FC<{ icon: React.ElementType; label: string }> = ({ icon, label }) => (
    <Icon as={icon} aria-label={label} transform="translateY(-2px)" boxSize="1.2rem" />
);

const Henting: React.FC = () => {
    const location = useLocation<{ henting?: ApiPlanlagtHenting; prevPath?: string }>();

    const routeMatch = useRouteMatch<{ hentingId?: string }>();
    const {
        data: planlagtHenting,
        isLoading,
        error,
    } = usePlanlagtHentingById(routeMatch.params.hentingId || '', {
        initialData: location?.state?.henting,
        enabled: routeMatch.params.hentingId !== undefined,
    });

    console.log(planlagtHenting);

    return planlagtHenting ? (
        <>
            <Helmet>
                <title>
                    {planlagtHenting.aktorNavn} henter fra {planlagtHenting.stasjonNavn},{' '}
                    {getDayString(parseISOIgnoreTimezone(planlagtHenting?.startTidspunkt))} kl.{' '}
                    {formatTime(parseISOIgnoreTimezone(planlagtHenting?.startTidspunkt))}
                </title>
            </Helmet>
            <Flex as="main" width="full" height="full" backgroundColor="surface">
                <Flex
                    width="2xl"
                    maxWidth="2xl"
                    marginX="auto"
                    direction="column"
                    padding="10"
                    paddingTop={{ base: '4', tablet: '14' }}
                    fontSize="18px"
                >
                    <Heading as="h1" fontWeight="normal" marginBottom="4">
                        {planlagtHenting.aktorNavn}
                    </Heading>
                    {location.state?.prevPath ? (
                        <RouterLink to={location.state.prevPath} fontSize="1rem" display="flex" alignItems="center">
                            <Icon as={ArrowLeft} aria-hidden marginRight="1" /> Tilbake
                        </RouterLink>
                    ) : null}
                    <VStack as="dl" spacing="3" alignItems="flex-start" marginTop="4">
                        {planlagtHenting.avlyst ? (
                            <Box>
                                <VisuallyHidden>
                                    <dt>Status</dt>
                                </VisuallyHidden>
                                <dd>
                                    <AvlystBadge />
                                </dd>
                            </Box>
                        ) : null}
                        <HStack>
                            <dt>
                                <IconLabel icon={Location} label="Stasjon" />
                            </dt>
                            <dd>{planlagtHenting.stasjonNavn}</dd>
                        </HStack>
                        <HStack>
                            <dt>
                                <IconLabel icon={Calendar} label="Dato" />
                            </dt>
                            <dd>
                                <time>{getDayString(parseISOIgnoreTimezone(planlagtHenting?.startTidspunkt))}</time>
                            </dd>
                        </HStack>
                        <HStack>
                            <dt>
                                <IconLabel icon={Clock} label="Tidspunkt" />
                            </dt>
                            <dd>
                                {`Fra kl. `}
                                <time>{formatTime(parseISOIgnoreTimezone(planlagtHenting?.startTidspunkt))}</time>
                                {` til kl. `}
                                <time>{formatTime(parseISOIgnoreTimezone(planlagtHenting?.sluttTidspunkt))}</time>
                            </dd>
                        </HStack>

                        {planlagtHenting.merknad ? (
                            <VStack spacing="1">
                                <Text as="dt" fontSize="1rem" fontWeight="medium" paddingTop="2">
                                    Merknad
                                </Text>
                                <dd>{planlagtHenting.merknad}</dd>
                            </VStack>
                        ) : null}

                        {planlagtHenting.kategorier.length > 0 ? (
                            <VStack spacing="1" alignItems="flex-start">
                                <Text as="dt" fontSize="1rem" fontWeight="medium" paddingTop="2">
                                    Kategorier
                                </Text>
                                <dd>
                                    <KategoriList
                                        size="md"
                                        kategorier={(planlagtHenting?.kategorier || []).map(({ kategori }) => kategori)}
                                    />
                                </dd>
                            </VStack>
                        ) : null}
                    </VStack>

                    {!planlagtHenting.avlyst ? (
                        <ButtonGroup marginTop="10" width="full">
                            {location.state?.prevPath ? (
                                <Button
                                    as={Link}
                                    to={location.state.prevPath}
                                    variant="outline"
                                    leftIcon={<Icon as={ArrowLeft} />}
                                >
                                    Tilbake
                                </Button>
                            ) : null}
                            <CancelPlanlagtHentingButton henting={planlagtHenting} />
                        </ButtonGroup>
                    ) : null}
                </Flex>
            </Flex>
        </>
    ) : null;
};

export default Henting;
