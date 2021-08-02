import * as React from 'react';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { BadgeDetail } from './BadgeDetail';
import { hentingStarted, parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';
import { RegisterVektButton } from './RegisterVektButton';
import { colors } from '../../../theme/foundations/colors';
import Check from '../../../assets/Check.svg';
import { useAuth } from '../../../auth/useAuth';
import { hasVektregistrering, isValidForVektregistrering } from '../../../utils/wrappedHentingHelpers';

interface Props {
    henting: ApiHentingWrapper;
}

export const DetailVektInfo: React.FC<Props> = ({ henting }) => {
    const { user } = useAuth();

    const hentingIsMissingVekt = !hasVektregistrering(henting);

    const getVektStatus = () => {
        if (hentingIsMissingVekt) {
            return <BadgeDetail text="Vekt mangler" color={colors.Red} />;
        }
        return <BadgeDetail text="Vekt er registrert" iconLeft={Check} color={colors.LightGreen} />;
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
        <>
            {getVektStatus()}
            {getVektregistreringButton()}
        </>
    ) : null;
};
