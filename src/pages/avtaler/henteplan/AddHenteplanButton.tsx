import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../../components/Modal';
import { AddButton } from '../../../components/buttons/AddButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { AddHenteplanForm } from './form/AddHenteplanForm';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface Props {
    avtale: ApiAvtale;
    partner: ApiPartner;
}

export const AddHenteplanButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ avtale, partner, ...props }) => {
    const history = useHistory();
    const { url } = useRouteMatch();

    const onClick = () => history.push(`${url}/henteplan/ny?avtaleId=${avtale.id}`, { avtale: avtale, callback: url });

    return (
        <>
            <AddButton
                label="Ny henteplan"
                borderRadius="6"
                aria-label={`Opprett ny henteplan for ${partner.navn}`}
                {...props}
                onClick={onClick}
            />
        </>
    );
};
