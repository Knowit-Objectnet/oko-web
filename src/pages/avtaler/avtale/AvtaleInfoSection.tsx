import * as React from 'react';
import {
    PartnerInfoSection,
    PartnerInfoSectionButtons,
    PartnerInfoSectionContent,
    PartnerInfoSectionHeader,
    PartnerInfoSectionTitle,
} from '../partner/PartnerInfoSection';
import { AvtaleInfoList } from './AvtaleInfoList';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { AddAvtaleButton } from './AddAvtaleButton';

interface Props {
    partner: ApiPartner;
}

export const AvtaleInfoSection: React.FC<Props> = ({ partner }) => (
    <PartnerInfoSection key={partner.id}>
        <PartnerInfoSectionHeader>
            <PartnerInfoSectionTitle>Avtaler</PartnerInfoSectionTitle>
            <PartnerInfoSectionButtons>
                <AddAvtaleButton partner={partner} />
            </PartnerInfoSectionButtons>
        </PartnerInfoSectionHeader>
        <PartnerInfoSectionContent>
            <AvtaleInfoList partner={partner} />
        </PartnerInfoSectionContent>
    </PartnerInfoSection>
);
