import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { FormModal } from '../../../components/forms/FormModal';
import { AddButton } from '../../../components/buttons/AddButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { AddHenteplanForm } from './AddHenteplanForm';

interface Props {
    avtale: ApiAvtale;
    partner: ApiPartner;
}

export const AddHenteplanButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ avtale, partner, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddButton
                label="Ny henteplan"
                aria-label={`Opprett ny henteplan for ${partner.navn}`}
                {...props}
                onClick={onOpen}
            />
            <FormModal title={`Ny henteplan for ${partner.navn}`} isOpen={isOpen} onClose={onClose}>
                <AddHenteplanForm avtale={avtale} onSuccess={onClose} />
            </FormModal>
        </>
    );
};
