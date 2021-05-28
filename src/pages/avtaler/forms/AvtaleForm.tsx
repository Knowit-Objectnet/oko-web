import React from 'react';
import { ApiPartner } from '../../../services-new/AktorService';

interface Props {
    partner: ApiPartner;
    afterSubmit?: () => void;
}

export const AvtaleForm: React.FC<Props> = ({ partner, afterSubmit }) => {
    return null;
};
