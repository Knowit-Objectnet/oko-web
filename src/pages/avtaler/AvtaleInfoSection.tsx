import * as React from 'react';
import {
    PartnerInfoSection,
    PartnerInfoSectionButtons,
    PartnerInfoSectionContent,
    PartnerInfoSectionHeader,
    PartnerInfoSectionTitle,
} from './PartnerInfoSection';
import { AvtaleInfoList } from './AvtaleInfoList';
import { ApiPartner } from '../../services/partner/PartnerService';
import { AddAvtaleButton } from './forms/AddAvtaleButton';

interface Props {
    partner: ApiPartner;
}

export const AvtaleInfoSection: React.FC<Props> = ({ partner }) => (
    <PartnerInfoSection>
        <PartnerInfoSectionHeader>
            <PartnerInfoSectionTitle>Avtaler</PartnerInfoSectionTitle>
            <PartnerInfoSectionButtons>
                <AddAvtaleButton partner={partner} />
            </PartnerInfoSectionButtons>
        </PartnerInfoSectionHeader>
        <PartnerInfoSectionContent>
            <AvtaleInfoList partner={partner} key={partner.id} />
        </PartnerInfoSectionContent>
    </PartnerInfoSection>
);
