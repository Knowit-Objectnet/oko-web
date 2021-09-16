import * as React from 'react';
import { useAuth } from '../../auth/useAuth';
import { ButtonGroup, useBreakpointValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { CancelPlanlagtHentingButton } from './components/CancelPlanlagtHentingButton';
import { AvlystDetails } from './components/AvlystDetails';
import { ApiHentingWrapper } from '../../services/henting/HentingService';
import { useHentingById } from '../../services/henting/useHentingById';
import { DetailHeader } from './components/DetailHeader';
import { DetailInfo } from './components/DetailInfo';
import { ApiPlanlagtHenting } from '../../services/henting/PlanlagtHentingService';
import { hasEnded } from '../../utils/wrappedHentingHelpers';
import { BackButton } from '../../components/buttons/BackButton';
import { Flex } from '@chakra-ui/layout';

export interface HentingDetailsRoutingProps {
    henting?: ApiHentingWrapper;
    showBackButton?: boolean;
}

interface Props {
    hentingId: string;
}

export const HentingDetails: React.FC<Props> = ({ hentingId }) => {
    const { user } = useAuth();
    const { state: locationState } = useLocation<HentingDetailsRoutingProps>();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });

    const hentingQuery = useHentingById(hentingId, {
        initialData: locationState?.henting,
    });

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
                <Flex width="100%" direction="column">
                    {hentingWrapper.planlagtHenting?.aarsakId ? <AvlystDetails henting={hentingWrapper} /> : null}

                    <DetailHeader henting={hentingWrapper} />

                    <DetailInfo henting={hentingWrapper} />
                    {!isSmallScreen && (
                        <ButtonGroup marginTop="10">
                            <BackButton visible={locationState?.showBackButton} />
                            {hentingWrapper.planlagtHenting && !hasEnded(hentingWrapper.planlagtHenting)
                                ? getCancelButton(hentingWrapper.planlagtHenting)
                                : null}
                        </ButtonGroup>
                    )}
                </Flex>
            );
        },
    );
};
