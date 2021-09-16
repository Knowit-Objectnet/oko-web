import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { AddButton } from '../buttons/AddButton';
import { ApiPartner } from '../../services/partner/PartnerService';
import { ApiStasjon } from '../../services/stasjon/StasjonService';
import { useHistory } from 'react-router-dom';

interface Props {
    aktor: ApiPartner | ApiStasjon;
}

export const AddKontaktPersonButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ aktor, ...props }) => {
    const history = useHistory();

    const onClick = () => history.push(`/partnere/kontakt/ny?aktorId=${aktor.id}`, { aktor: aktor });

    return (
        <AddButton
            label="Ny kontaktperson"
            borderRadius="6"
            aria-label={`Registrer ny kontaktperson for ${aktor.navn}`}
            {...props}
            onClick={onClick}
        />
    );
};
