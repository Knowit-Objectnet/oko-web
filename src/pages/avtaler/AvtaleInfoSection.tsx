import * as React from 'react';
import {
    PartnerInfoSection,
    PartnerInfoSectionButtons,
    PartnerInfoSectionContent,
    PartnerInfoSectionHeader,
    PartnerInfoSectionTitle,
} from './PartnerInfoSection';
import { AddButton } from '../../components/buttons/AddButton';
import { AvtaleInfoList } from './AvtaleInfoList';
import { ApiPartner } from '../../services-currentapi/PartnerService';

interface Props {
    partner: ApiPartner;
}

export const AvtaleInfoSection: React.FC<Props> = ({ partner }) => (
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
            <AvtaleInfoList partner={partner} key={partner.id} />
        </PartnerInfoSectionContent>
    </PartnerInfoSection>
);
