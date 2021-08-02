import * as React from 'react';
import { useAuth } from '../../auth/useAuth';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { CancelPlanlagtHentingButton } from './components/CancelPlanlagtHentingButton';
import { AvlystDetails } from './components/AvlystDetails';
import { ApiHentingWrapper } from '../../services/henting/HentingService';
import { useHentingById } from '../../services/henting/useHentingById';
import { DetailHeader } from './components/DetailHeader';
import { DetailInfo } from './components/DetailInfo';
import { ApiPlanlagtHenting } from '../../services/henting/PlanlagtHentingService';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';

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

    const getCancelButton = (henting: ApiPlanlagtHenting) => {
        if (!henting.avlyst && userCanCancelHenting(henting)) {
            return <CancelPlanlagtHentingButton henting={henting} variant="outline" />;
        }
    };

    const userCanCancelHenting = (henting: ApiPlanlagtHenting) => {
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
            return (
                <>
                    {hentingWrapper.planlagtHenting?.aarsakId ? <AvlystDetails henting={hentingWrapper} /> : null}

                    <DetailHeader henting={hentingWrapper} />

                    <DetailInfo henting={hentingWrapper} />

                    <ButtonGroup marginTop="10">
                        {getBackButton()}
                        {hentingWrapper.planlagtHenting &&
                        parseISOIgnoreTimezone(hentingWrapper.startTidspunkt) > new Date()
                            ? getCancelButton(hentingWrapper.planlagtHenting)
                            : null}
                    </ButtonGroup>
                </>
            );
        },
    );
};
