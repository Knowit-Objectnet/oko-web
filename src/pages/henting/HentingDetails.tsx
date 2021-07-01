import * as React from 'react';
import { Badge, BadgeProps, Button, ButtonGroup, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
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
import { useAuth } from '../../auth/useAuth';

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
    const { user } = useAuth();
    const { state: locationState } = useLocation<{ henting?: ApiPlanlagtHenting; prevPath?: string }>();

    const hentingQuery = usePlanlagtHentingById(hentingId, {
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
        return null;
    };

    const userCanCancelHenting = (planlagtHenting: ApiPlanlagtHenting) => {
        const aktorUserOwnsHenting = user.ownsResource(planlagtHenting.aktorId);
        const stasjonUserOwnsHenting = user.ownsResource(planlagtHenting.stasjonId);
        return user.isAdmin || aktorUserOwnsHenting || stasjonUserOwnsHenting;
    };

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
                <VStack spacing="3" alignItems="flex-start" marginTop="4">
                    {planlagtHenting.avlyst ? (
                        <AvlystBadge marginBottom="2" fontSize="1rem" aria-label="Status" />
                    ) : null}
                    <HStack>
                        <IconLabel icon={Location} label="Stasjon" />
                        <Text>{planlagtHenting.stasjonNavn}</Text>
                    </HStack>
                    <HStack>
                        <IconLabel icon={Calendar} label="Dato" />
                        <Text>
                            <time>{getDayString(parseISOIgnoreTimezone(planlagtHenting?.startTidspunkt))}</time>
                        </Text>
                    </HStack>
                    <HStack>
                        <IconLabel icon={Clock} label="Tidspunkt" />
                        <Text>
                            {`Fra kl. `}
                            <time>{formatTime(parseISOIgnoreTimezone(planlagtHenting?.startTidspunkt))}</time>
                            {` til kl. `}
                            <time>{formatTime(parseISOIgnoreTimezone(planlagtHenting?.sluttTidspunkt))}</time>
                        </Text>
                    </HStack>

                    {planlagtHenting.merknad ? (
                        <VStack spacing="1">
                            <Heading as="h2" fontSize="1rem" fontWeight="medium" paddingTop="2">
                                Merknad
                            </Heading>
                            <Text>{planlagtHenting.merknad}</Text>
                        </VStack>
                    ) : null}

                    {planlagtHenting.kategorier.length > 0 ? (
                        <VStack spacing="1" alignItems="flex-start">
                            <Heading as="h2" fontSize="1rem" fontWeight="medium" paddingTop="2">
                                Kategorier
                            </Heading>
                            <KategoriList
                                size="md"
                                kategorier={(planlagtHenting?.kategorier || []).map(({ kategori }) => kategori)}
                            />
                        </VStack>
                    ) : null}
                </VStack>

                <ButtonGroup marginTop="10">
                    {getBackButton()}
                    {!planlagtHenting.avlyst && userCanCancelHenting(planlagtHenting) ? (
                        <CancelPlanlagtHentingButton henting={planlagtHenting} />
                    ) : null}
                </ButtonGroup>
            </>
        ),
    );
};
