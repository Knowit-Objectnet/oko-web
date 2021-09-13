import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { AddButton } from '../../../components/buttons/AddButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { useHistory } from 'react-router-dom';

interface Props {
    avtale: ApiAvtale;
    partner: ApiPartner;
}

export const AddHenteplanButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ avtale, partner, ...props }) => {
    const history = useHistory();

    const onClick = () => history.push(`/avtaler/henteplan/ny?avtaleId=${avtale.id}`, { avtale: avtale });

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
