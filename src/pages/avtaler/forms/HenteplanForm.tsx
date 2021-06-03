import * as React from 'react';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { ApiPartner } from '../../../services/partner/PartnerService';

interface Props {
    partner: ApiPartner;
    avtale: ApiAvtale;
    onSuccess?: () => void;
}

export const HenteplanForm: React.FC<Props> = () => null;
