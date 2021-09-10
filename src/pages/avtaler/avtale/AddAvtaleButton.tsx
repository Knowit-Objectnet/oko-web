import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { AddButton } from '../../../components/buttons/AddButton';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { useHistory } from 'react-router-dom';

interface Props {
    partner: ApiPartner;
}

export const AddAvtaleButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ partner, ...props }) => {
    const history = useHistory();

    const onClick = () => history.push(`/avtaler/ny?partnerId=${partner.id}`, { partner: partner });

    return (
        <AddButton
            label="Ny avtale"
            borderRadius="6"
            aria-label={`Opprett ny avtale for ${partner.navn}`}
            {...props}
            onClick={onClick}
        />
    );
};
