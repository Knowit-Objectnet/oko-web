import * as React from 'react';
import {
    PartnerInfoSection,
    PartnerInfoSectionButtons,
    PartnerInfoSectionContent,
    PartnerInfoSectionHeader,
    PartnerInfoSectionTitle,
} from '../../pages/avtaler/partner/PartnerInfoSection';
import { KontaktPersonList } from './KontaktPersonList';
import { AddKontaktPersonButton } from './AddKontaktPersonButton';
import { ApiPartner } from '../../services/partner/PartnerService';
import { ApiStasjon } from '../../services/stasjon/StasjonService';
import {
    StasjonInfoSection,
    StasjonInfoSectionButtons,
    StasjonInfoSectionContent,
    StasjonInfoSectionHeader,
    StasjonInfoSectionTitle,
} from '../../pages/stasjoner/stasjon/StasjonInfoSection';
import { useAuth } from '../../auth/useAuth';

interface Props {
    aktor: ApiPartner | ApiStasjon;
    isPartner: boolean;
}

export const KontaktPersonSection: React.FC<Props> = ({ aktor, isPartner }) => {
    const { kontaktPersoner } = aktor;
    const { user } = useAuth();

    if (isPartner) {
        return (
            <PartnerInfoSection>
                <PartnerInfoSectionHeader>
                    <PartnerInfoSectionTitle>Kontaktpersoner</PartnerInfoSectionTitle>
                    <PartnerInfoSectionButtons>
                        {user.isStasjon ? null : <AddKontaktPersonButton aktor={aktor} />}
                    </PartnerInfoSectionButtons>
                </PartnerInfoSectionHeader>
                <PartnerInfoSectionContent>
                    {kontaktPersoner && kontaktPersoner.length > 0 ? (
                        <KontaktPersonList kontaktPersoner={kontaktPersoner} />
                    ) : (
                        'Ingen registrerte kontaktpersoner'
                    )}
                </PartnerInfoSectionContent>
            </PartnerInfoSection>
        );
    }
    return (
        <StasjonInfoSection>
            <StasjonInfoSectionHeader>
                <StasjonInfoSectionTitle>Kontaktpersoner</StasjonInfoSectionTitle>
                <StasjonInfoSectionButtons>
                    <AddKontaktPersonButton aktor={aktor} />
                </StasjonInfoSectionButtons>
            </StasjonInfoSectionHeader>
            <StasjonInfoSectionContent>
                {kontaktPersoner && kontaktPersoner.length > 0 ? (
                    <KontaktPersonList kontaktPersoner={kontaktPersoner} />
                ) : (
                    'Ingen registrerte kontaktpersoner'
                )}
            </StasjonInfoSectionContent>
        </StasjonInfoSection>
    );
};
