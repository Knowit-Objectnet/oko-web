import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { AddButton } from '../../../components/buttons/AddButton';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface Props {
    partner: ApiPartner;
}

export const AddAvtaleButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ partner, ...props }) => {
    const history = useHistory();
    const { url } = useRouteMatch();

    const onClick = () => history.push(`${url}/ny`, { partner: partner, callback: url });

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
