import React from 'react';
import { ApiAvtale } from '../../services-new/AvtaleService';
import {
    PartnerInfoSection,
    PartnerInfoSectionButtons,
    PartnerInfoSectionContent,
    PartnerInfoSectionHeader,
    PartnerInfoSectionTitle,
} from './PartnerInfoSection';
import { AddButton } from '../../components/buttons/AddButton';
import { AvtaleInfoList } from './AvtaleInfoList';

interface Props {
    avtaler: Array<ApiAvtale>;
}

export const AvtaleSection: React.FC<Props> = ({ avtaler }) => (
    <PartnerInfoSection>
        <PartnerInfoSectionHeader>
            <PartnerInfoSectionTitle>Avtaler</PartnerInfoSectionTitle>
            <PartnerInfoSectionButtons>
                <AddButton
                    label="Ny avtale"
                    onClick={() => {
                        console.log('Legg til ny avtale');
                    }}
                />
            </PartnerInfoSectionButtons>
        </PartnerInfoSectionHeader>
        <PartnerInfoSectionContent>
            <AvtaleInfoList avtaler={avtaler} />
        </PartnerInfoSectionContent>
    </PartnerInfoSection>
);
