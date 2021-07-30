import * as React from 'react';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { BadgeDetail } from './BadgeDetail';
import { hentingStarted } from '../../../utils/hentingDateTimeHelpers';
import { RegisterVektButton } from './RegisterVektButton';
import { colors } from '../../../theme/foundations/colors';
import Check from '../../../assets/Check.svg';

interface Props {
    henting: ApiHentingWrapper;
}

export const DetailWeightInfo: React.FC<Props> = ({ henting }) => (
    <>
        {(henting.planlagtHenting && henting.planlagtHenting.vektregistreringer.length > 0) ||
        (henting.ekstraHenting && henting.ekstraHenting?.vektregistreringer.length > 0) ? (
            <>
                <BadgeDetail text="Vekt er registrert" iconLeft={Check} color={colors.LightGreen} />
            </>
        ) : new Date(henting.startTidspunkt) < new Date() ? (
            henting.ekstraHenting && !henting.ekstraHenting.godkjentUtlysning ? null : (
                <>
                    <BadgeDetail text="Vekt mangler" color={colors.Red} />
                    {hentingStarted(henting.planlagtHenting || henting.ekstraHenting) ? (
                        <RegisterVektButton henting={henting.planlagtHenting || henting.ekstraHenting} />
                    ) : null}
                </>
            )
        ) : null}
    </>
);
