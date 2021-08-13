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
import { useAuth } from '../../../auth/useAuth';

interface Props {
    partner: ApiPartner;
}

export const AvtaleInfoSection: React.FC<Props> = ({ partner }) => {
    const { user } = useAuth();

    return (
        <PartnerInfoSection key={partner.id}>
            <PartnerInfoSectionHeader>
                {user.isPartner ? null : <PartnerInfoSectionTitle>Avtaler</PartnerInfoSectionTitle>}
                {user.isAdmin ? (
                    <PartnerInfoSectionButtons>
                        <AddAvtaleButton partner={partner} />
                    </PartnerInfoSectionButtons>
                ) : null}
            </PartnerInfoSectionHeader>

            <PartnerInfoSectionContent>
                <AvtaleInfoList partner={partner} />
            </PartnerInfoSectionContent>
        </PartnerInfoSection>
    );
};
