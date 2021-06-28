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
            {user.isAdmin ? (
                <PartnerInfoSectionHeader>
                    <PartnerInfoSectionTitle>Avtaler</PartnerInfoSectionTitle>

                    <PartnerInfoSectionButtons>
                        <AddAvtaleButton partner={partner} />
                    </PartnerInfoSectionButtons>
                </PartnerInfoSectionHeader>
            ) : null}

            <PartnerInfoSectionContent>
                <AvtaleInfoList partner={partner} />
            </PartnerInfoSectionContent>
        </PartnerInfoSection>
    );
};
