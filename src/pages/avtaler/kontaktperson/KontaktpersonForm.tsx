import * as React from 'react';
import { ApiPartner } from '../../../services/partner/PartnerService';

interface Props {
    partner: ApiPartner;
    onSuccess: () => void;
}

export const KontaktpersonForm: React.FC<Props> = ({ partner, onSuccess }) => {
    return null;
};
