import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../Modal';
import { AddButton } from '../buttons/AddButton';
import { ApiPartner } from '../../services/partner/PartnerService';
import { KontaktPersonForm } from './KontaktPersonForm';
import { ApiStasjon } from '../../services/stasjon/StasjonService';

interface Props {
    aktor: ApiPartner | ApiStasjon;
}

export const AddKontaktPersonButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ aktor, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddButton
                label="Ny kontaktperson"
                borderRadius="6"
                aria-label={`Registrer ny kontaktperson for ${aktor.navn}`}
                {...props}
                onClick={onOpen}
            />
            <Modal title={`Ny kontaktperson for ${aktor.navn}`} isOpen={isOpen} onClose={onClose}>
                <KontaktPersonForm aktor={aktor} onSuccess={onClose} />
            </Modal>
        </>
    );
};
