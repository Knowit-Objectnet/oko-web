import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Flex } from '@chakra-ui/layout';
import { ApiPlanlagtHenting } from '../../services/henting/HentingService';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { usePlanlagtHentingById } from '../../services/henting/usePlanlagtHentingById';
import { formatDate, formatTime } from '../../utils/formatDateTime';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { KategoriList } from '../../components/KategoriList';
import { HStack, Icon, VStack, Badge, VisuallyHidden } from '@chakra-ui/react';
import { isToday } from 'date-fns';
import Calendar from '../../assets/Calendar.svg';
import Clock from '../../assets/Clock.svg';
import Location from '../../assets/Location.svg';
import Warning from '../../assets/Warning.svg';
import { CancelPlanlagtHentingButton } from './CancelPlanlagtHentingButton';

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

const Henting: React.FC = () => {
    const location = useLocation<{ henting?: ApiPlanlagtHenting; prevPath?: string }>();

    const routeMatch = useRouteMatch<{ hentingId?: string }>();
    const { data, isLoading, error } = usePlanlagtHentingById(routeMatch.params.hentingId || '', {
        initialData: location?.state?.henting,
        enabled: routeMatch.params.hentingId !== undefined,
    });

    return (
        <>
            <Helmet>
                {/*TODO: create title from calendar state*/}
                <title>Kalender</title>
            </Helmet>
            {data ? (
                <Flex as="main" width="full" height="full" backgroundColor="surface">
                    <Flex width="4xl" maxWidth="4xl" marginX="auto" direction="column" padding="10">
                        {location.state?.prevPath ? <Link to={location.state.prevPath}>&laquo; Tilbake</Link> : null}
                        <VStack as="dl" spacing="3" alignItems="flex-start" marginY="4">
                            <Box>
                                <VisuallyHidden>
                                    <dt>Partner</dt>
                                </VisuallyHidden>
                                <dd>{data.aktorNavn}</dd>
                            </Box>

                            {data.avlyst ? (
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
                                    <Icon as={Location} aria-label="Stasjon" />
                                </dt>
                                <dd>{data.stasjonNavn}</dd>
                            </HStack>
                            <HStack>
                                <dt>
                                    <Icon as={Calendar} aria-label="Dato" />
                                </dt>
                                <dd>{getDayString(parseISOIgnoreTimezone(data?.startTidspunkt))}</dd>
                            </HStack>
                            <HStack>
                                <dt>
                                    <Icon as={Clock} aria-label="Tidspunkt" />
                                </dt>
                                <dd>
                                    {`Fra kl. `}
                                    {formatTime(parseISOIgnoreTimezone(data?.startTidspunkt))}
                                    {` til kl. `}
                                    {formatTime(parseISOIgnoreTimezone(data?.sluttTidspunkt))}
                                </dd>
                            </HStack>

                            {data?.merknad ? (
                                <VStack spacing="1">
                                    <dt>Merknad</dt>
                                    <dd>{data.merknad}</dd>
                                </VStack>
                            ) : null}

                            {data.kategorier.length > 0 ? (
                                <VStack spacing="1" alignItems="flex-start">
                                    <dt>Kategorier</dt>
                                    <dd>
                                        <KategoriList
                                            kategorier={(data?.kategorier || []).map(({ kategori }) => kategori)}
                                        />
                                    </dd>
                                </VStack>
                            ) : null}
                        </VStack>
                        {!data.avlyst ? <CancelPlanlagtHentingButton henting={data} /> : null}
                    </Flex>
                </Flex>
            ) : (
                'Laster data'
            )}
        </>
    );
};

export default Henting;
