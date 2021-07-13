import * as React from 'react';
import { Button, ButtonGroup, Heading, Text, VStack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { ApiPlanlagtHenting } from '../../services/henting/PlanlagtHentingService';
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
import { ApiHentingWrapper } from '../../services/henting/HentingService';
import { useHentingById } from '../../services/henting/useHentingById';

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
        (hentingWrapper) => (
            <>
                {hentingWrapper.planlagtHenting?.avlyst && hentingWrapper.planlagtHenting?.avlystAv ? (
                    <AvlystDetails
                        id={hentingWrapper.planlagtHenting.avlystAv}
                        aarsakId={hentingWrapper.planlagtHenting?.aarsakId}
                        mb="1em"
                    />
                ) : null}
                <Heading as="h1" fontWeight="normal" aria-label="Partner">
                    {hentingWrapper.aktorNavn}
                </Heading>
                <VStack spacing="3" alignItems="flex-start" marginTop="4">
                    <DetailWithIcon icon={Location} label="Stasjon">
                        {hentingWrapper.stasjonNavn}
                    </DetailWithIcon>
                    <DetailWithIcon icon={Calendar} label="Dato">
                        <time>{getDayString(parseISOIgnoreTimezone(hentingWrapper.startTidspunkt))}</time>
                    </DetailWithIcon>
                    <DetailWithIcon icon={Clock} label="Tidspunkt">
                        {`Fra kl. `}
                        <time>{formatTime(parseISOIgnoreTimezone(hentingWrapper.startTidspunkt))}</time>
                        {` til kl. `}
                        <time>{formatTime(parseISOIgnoreTimezone(hentingWrapper.sluttTidspunkt))}</time>
                    </DetailWithIcon>
                    {hentingWrapper.planlagtHenting && hentingWrapper.planlagtHenting.kategorier.length > 0 ? (
                        <DetailWithLabel label="Kategorier">
                            <KategoriList
                                size="md"
                                kategorier={hentingWrapper.planlagtHenting.kategorier.map(({ kategori }) => kategori)}
                            />
                        </DetailWithLabel>
                    ) : null}
                    {hentingWrapper.planlagtHenting?.merknad ? (
                        <DetailWithLabel label="Merknad">
                            <Text>{hentingWrapper.planlagtHenting?.merknad}</Text>
                        </DetailWithLabel>
                    ) : null}
                </VStack>
                <ButtonGroup marginTop="10">
                    {getBackButton()}
                    {getCancelButton(hentingWrapper)}
                </ButtonGroup>
            </>
        ),
    );
};
