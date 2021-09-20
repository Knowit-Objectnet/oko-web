import * as React from 'react';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { BadgeDetail } from './BadgeDetail';
import { RegisterVektButton } from './RegisterVektButton';
import { colors } from '../../../theme/foundations/colors';
import Check from '../../../assets/Check.svg';
import { useAuth } from '../../../auth/useAuth';
import {
    getVektregistreringAv,
    hasVektregistrering,
    isValidForVektregistrering,
} from '../../../utils/wrappedHentingHelpers';
import { Flex } from '@chakra-ui/layout';

interface Props {
    henting: ApiHentingWrapper;
}

export const DetailVektInfo: React.FC<Props> = ({ henting }) => {
    const { user } = useAuth();

    const hentingIsMissingVekt = !hasVektregistrering(henting);

    const getVektStatus = () => {
        if (hentingIsMissingVekt) {
            return <BadgeDetail text="Vekt mangler" color={colors.Red} />;
        } else if (user.isPartner || user.isStasjon) {
            return <BadgeDetail text="Vekt er registrert" iconLeft={Check} color={colors.LightGreen} />;
        } else if (user.isAdmin) {
            return (
                <BadgeDetail
                    text={'Vekt er registrert av ' + getVektregistreringAv(henting)}
                    iconLeft={Check}
                    color={colors.LightGreen}
                />
            );
        }
    };

    const getVektregistreringButton = () => {
        const partnerUserOwnsHenting = henting.aktorId && user.ownsResource(henting.aktorId);
        const stasjonUserOwnsHenting = user.ownsResource(henting.stasjonId);
        const userCanRegisterVekt = partnerUserOwnsHenting || stasjonUserOwnsHenting || user.isAdmin;

        if (hentingIsMissingVekt && userCanRegisterVekt) {
            return <RegisterVektButton henting={henting} />;
        }
        return null;
    };

    return isValidForVektregistrering(henting) ? (
        //Height er satt til 40px for aa ha lik avstand mellom ekstrahenting-label og flex-box med vektregistrering.
        // Hvis ikke height er statisk, vil avstanden endres etter vekt er registrert pga storrelsen paa knapp for vektregistrering naar den fjernes.
        <Flex direction="row" width="auto" align="center" height="10">
            {getVektStatus()}
            {getVektregistreringButton()}
        </Flex>
    ) : null;
};
