import * as React from 'react';
import {
    Badge,
    BadgeProps,
    Button,
    ButtonGroup,
    Heading,
    HStack,
    Icon,
    Text,
    VisuallyHidden,
    VStack,
} from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/layout';
import { Link, useLocation } from 'react-router-dom';
import { ApiPlanlagtHenting } from '../../services/henting/HentingService';
import { usePlanlagtHentingById } from '../../services/henting/usePlanlagtHentingById';
import { Helmet } from 'react-helmet';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { formatDate, formatTime } from '../../utils/formatDateTime';
import { KategoriList } from '../../components/KategoriList';
import { CancelPlanlagtHentingButton } from './CancelPlanlagtHentingButton';
import { isToday } from 'date-fns';
import Warning from '../../assets/Warning.svg';
import Location from '../../assets/Location.svg';
import Calendar from '../../assets/Calendar.svg';
import Clock from '../../assets/Clock.svg';
import ArrowLeft from '../../assets/ArrowLeft.svg';

const getDayString = (date: Date) => {
    if (isToday(date)) {
        return 'I dag';
    }
    return formatDate(date);
};

export const AvlystBadge: React.FC<BadgeProps> = (props) => (
    <Badge
        as={Flex}
        variant="solid"
        backgroundColor="error"
        color="onError"
        fontSize="0.8rem"
        paddingY="0.5"
        paddingX="1.5"
        borderRadius={0}
        {...props}
    >
        <Icon as={Warning} transform="translateY(-2px)" /> Avlyst
    </Badge>
);

const IconLabel: React.FC<{ icon: React.ElementType; label: string }> = ({ icon, label }) => (
    <Icon as={icon} aria-label={label} transform="translateY(-2px)" boxSize="1.2rem" />
);

interface Props {
    hentingId: string;
}

export const HentingDetails: React.FC<Props> = ({ hentingId }) => {
    const { state: locationState } = useLocation<{ henting?: ApiPlanlagtHenting; prevPath?: string }>();

    const hentingQuery = usePlanlagtHentingById(hentingId, {
        initialData: locationState?.henting,
        retry: 1,
    });

    return hentingQuery.dispatch<React.ReactElement | null>(
        () => null,
        () => <>Vennligst vent...</>,
        () => <>Klarte dessverre ikke å finne informasjon for denne hentingen</>,
        (planlagtHenting) => (
            <>
                <Helmet>
                    <title>
                        {planlagtHenting.aktorNavn} henter fra {planlagtHenting.stasjonNavn},{' '}
                        {getDayString(parseISOIgnoreTimezone(planlagtHenting?.startTidspunkt))} kl.{' '}
                        {formatTime(parseISOIgnoreTimezone(planlagtHenting?.startTidspunkt))}
                    </title>
                </Helmet>
                <Heading as="h1" fontWeight="normal">
                    {planlagtHenting.aktorNavn}
                </Heading>
                {/*{location.state?.prevPath ? (*/}
                {/*    <RouterLink to={location.state.prevPath} fontSize="1rem" display="flex" alignItems="center">*/}
                {/*        <Icon as={ArrowLeft} aria-hidden marginRight="1" /> Tilbake*/}
                {/*    </RouterLink>*/}
                {/*) : null}*/}
                <VStack as="dl" spacing="3" alignItems="flex-start" marginTop="4">
                    {planlagtHenting.avlyst ? (
                        <Box>
                            <VisuallyHidden>
                                <dt>Status</dt>
                            </VisuallyHidden>
                            <dd>
                                <AvlystBadge marginBottom="2" fontSize="1rem" />
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

                <ButtonGroup marginTop="10" width="full">
                    {locationState?.prevPath ? (
                        <Button
                            as={Link}
                            to={locationState.prevPath}
                            variant="outline"
                            // leftIcon={<Icon as={ArrowLeft} />}
                        >
                            Tilbake
                        </Button>
                    ) : null}
                    {!planlagtHenting.avlyst ? <CancelPlanlagtHentingButton henting={planlagtHenting} /> : null}
                </ButtonGroup>
            </>
        ),
    );
};
