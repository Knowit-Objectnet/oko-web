import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { EditButton } from '../buttons/EditButton';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface Props {
    kontakt: ApiKontakt;
}

export const EditKontaktPersonButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ kontakt, ...props }) => {
    const history = useHistory();
    const { url } = useRouteMatch();

    const onClick = () =>
        history.push(`/partnere/kontakt/rediger?kontaktId=${kontakt.id}`, { kontaktToEdit: kontakt, callback: url });

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
