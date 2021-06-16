import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { FormModal } from '../../../components/forms/FormModal';
import { AddButton } from '../../../components/buttons/AddButton';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { KontaktPersonForm } from './KontaktPersonForm';

interface Props {
    partner: ApiPartner;
}

export const AddKontaktPersonButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ partner, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddButton
                label="Ny kontaktperson"
                aria-label={`Registrer ny kontaktperson for ${partner.navn}`}
                {...props}
                onClick={onOpen}
            />
            <FormModal title={`Ny kontaktperson for ${partner.navn}`} isOpen={isOpen} onClose={onClose}>
                <KontaktPersonForm partner={partner} onSuccess={onClose} />
            </FormModal>
        </>
    );
};
