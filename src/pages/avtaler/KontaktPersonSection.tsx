import React from 'react';
import { ApiKontakt } from '../../services-new/AktorService';
import {
    PartnerInfoSection,
    PartnerInfoSectionButtons,
    PartnerInfoSectionContent,
    PartnerInfoSectionHeader,
    PartnerInfoSectionTitle,
} from './PartnerInfoSection';
import { AddButton } from '../../components/buttons/AddButton';
import { KontaktTable } from './KontaktTable';

interface Props {
    kontaktPersoner: Array<ApiKontakt>;
}

export const KontaktPersonSection: React.FC<Props> = ({ kontaktPersoner }) => (
    <PartnerInfoSection>
        <PartnerInfoSectionHeader>
            <PartnerInfoSectionTitle>Kontaktpersoner</PartnerInfoSectionTitle>
            <PartnerInfoSectionButtons>
                <AddButton
                    label="Ny kontaktperson"
                    onClick={() => {
                        console.log('Legg til ny kontaktperson');
                    }}
                />
            </PartnerInfoSectionButtons>
        </PartnerInfoSectionHeader>
        <PartnerInfoSectionContent>
            {kontaktPersoner.length > 0 ? (
                <KontaktTable kontaktPersoner={kontaktPersoner} />
            ) : (
                'Ingen registrerte kontaktpersoner'
            )}
        </PartnerInfoSectionContent>
    </PartnerInfoSection>
);
