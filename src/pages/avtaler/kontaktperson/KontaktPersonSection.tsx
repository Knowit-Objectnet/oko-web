import * as React from 'react';
import {
    PartnerInfoSection,
    PartnerInfoSectionButtons,
    PartnerInfoSectionContent,
    PartnerInfoSectionHeader,
    PartnerInfoSectionTitle,
} from '../partner/PartnerInfoSection';
import { KontaktPersonTable } from './KontaktPersonTable';
import { AddKontaktpersonButton } from './AddKontaktPersonButton';
import { ApiPartner } from '../../../services/partner/PartnerService';

interface Props {
    partner: ApiPartner;
}

export const KontaktPersonSection: React.FC<Props> = ({ partner }) => {
    const { kontaktPersoner } = partner;

    return (
        <PartnerInfoSection>
            <PartnerInfoSectionHeader>
                <PartnerInfoSectionTitle>Kontaktpersoner</PartnerInfoSectionTitle>
                <PartnerInfoSectionButtons>
                    <AddKontaktpersonButton partner={partner} />
                </PartnerInfoSectionButtons>
            </PartnerInfoSectionHeader>
            <PartnerInfoSectionContent>
                {kontaktPersoner && kontaktPersoner.length > 0 ? (
                    <KontaktPersonTable kontaktPersoner={kontaktPersoner} />
                ) : (
                    'Ingen registrerte kontaktpersoner'
                )}
            </PartnerInfoSectionContent>
        </PartnerInfoSection>
    );
};
