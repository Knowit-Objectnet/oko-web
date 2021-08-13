import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../../components/Modal';
import { AddButton } from '../../../components/buttons/AddButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { AddHenteplanForm } from './form/AddHenteplanForm';

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
                borderRadius="6"
                aria-label={`Opprett ny henteplan for ${partner.navn}`}
                {...props}
                onClick={onOpen}
            />
            <Modal title={`Ny henteplan for ${partner.navn}`} isOpen={isOpen} onClose={onClose}>
                <AddHenteplanForm avtale={avtale} onSuccess={onClose} />
            </Modal>
        </>
    );
};
