import * as React from 'react';
import { Button, ButtonGroup, Heading, Text, VStack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { ApiPlanlagtHenting } from '../../services/henting/HentingService';
import { usePlanlagtHentingById } from '../../services/henting/usePlanlagtHentingById';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { formatDate, formatTime } from '../../utils/formatDateTime';
import { KategoriList } from '../../components/KategoriList';
import { CancelPlanlagtHentingButton } from './components/CancelPlanlagtHentingButton';
import { isToday } from 'date-fns';
import Location from '../../assets/Location.svg';
import Calendar from '../../assets/Calendar.svg';
import Clock from '../../assets/Clock.svg';
import { useAuth } from '../../auth/useAuth';
import { DetailWithIcon } from './components/DetailWithIcon';
import { DetailWithLabel } from './components/DetailWithLabel';
import { AvlystDetails } from './components/AvlystDetails';
import { AvlystBadge } from './components/AvlystBadge';

const getDayString = (date: Date) => {
    if (isToday(date)) {
        return 'I dag';
    }
    return formatDate(date);
};

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
    };

    const getCancelButton = (henting: ApiPlanlagtHenting) => {
        if (!henting.avlyst && userCanCancelHenting(henting)) {
            return <CancelPlanlagtHentingButton henting={henting} variant="outline" />;
        }
    };

    const userCanCancelHenting = (henting: ApiPlanlagtHenting) => {
        const aktorUserOwnsHenting = user.ownsResource(henting.aktorId);
        const stasjonUserOwnsHenting = user.ownsResource(henting.stasjonId);
        return user.isAdmin || aktorUserOwnsHenting || stasjonUserOwnsHenting;
    };

    // TODO: create better UI for loading and error states
    return hentingQuery.dispatch<React.ReactElement | null>(
        () => null,
        () => <>Vennligst vent...</>,
        () => <>Klarte dessverre ikke å finne informasjon for denne hentingen</>,
        (henting) => (
            <>
                {henting.avlyst && henting.avlystAv ? (
                    <AvlystDetails id={henting.avlystAv} aarsak={henting.aarsak} mb="1em" />
                ) : null}
                <Heading as="h1" fontWeight="normal" aria-label="Partner">
                    {henting.aktorNavn}
                </Heading>
                <VStack spacing="3" alignItems="flex-start" marginTop="4">
                    <DetailWithIcon icon={Location} label="Stasjon">
                        {henting.stasjonNavn}
                    </DetailWithIcon>
                    <DetailWithIcon icon={Calendar} label="Dato">
                        <time>{getDayString(parseISOIgnoreTimezone(henting.startTidspunkt))}</time>
                    </DetailWithIcon>
                    <DetailWithIcon icon={Clock} label="Tidspunkt">
                        {`Fra kl. `}
                        <time>{formatTime(parseISOIgnoreTimezone(henting.startTidspunkt))}</time>
                        {` til kl. `}
                        <time>{formatTime(parseISOIgnoreTimezone(henting.sluttTidspunkt))}</time>
                    </DetailWithIcon>
                    {henting.kategorier.length > 0 ? (
                        <DetailWithLabel label="Kategorier">
                            <KategoriList size="md" kategorier={henting.kategorier.map(({ kategori }) => kategori)} />
                        </DetailWithLabel>
                    ) : null}
                    {henting.merknad ? (
                        <DetailWithLabel label="Merknad">
                            <Text>{henting.merknad}</Text>
                        </DetailWithLabel>
                    ) : null}
                </VStack>
                <ButtonGroup marginTop="10">
                    {getBackButton()}
                    {getCancelButton(henting)}
                </ButtonGroup>
            </>
        ),
    );
};
