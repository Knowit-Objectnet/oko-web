import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { FormModal } from '../../../components/forms/FormModal';
import { AddButton } from '../../../components/buttons/AddButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { HenteplanForm } from './HenteplanForm';

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
            <FormModal title="Ny henteplan" isOpen={isOpen} onClose={onClose}>
                <HenteplanForm avtale={avtale} partner={partner} onSuccess={onClose} />
            </FormModal>
        </>
    );
};
