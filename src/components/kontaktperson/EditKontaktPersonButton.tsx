import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { EditButton } from '../buttons/EditButton';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import { useHistory } from 'react-router-dom';

interface Props {
    kontakt: ApiKontakt;
}

export const EditKontaktPersonButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ kontakt, ...props }) => {
    const history = useHistory();

    const onClick = () => history.push(`/partnere/kontakt/rediger?kontaktId=${kontakt.id}`, { kontakt: kontakt });

    return (
        <EditButton
            label="Rediger"
            borderRadius="6"
            aria-label={`Rediger kontaktinformasjon for ${kontakt.navn}`}
            {...props}
            onClick={onClick}
        />
    );
};
