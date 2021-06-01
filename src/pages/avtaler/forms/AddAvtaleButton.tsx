import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { FormModal } from '../../../components/forms/FormModal';
import { AddButton } from '../../../components/buttons/AddButton';
import { AvtaleForm } from './AvtaleForm';
import { ApiPartner } from '../../../services/partner/PartnerService';

interface Props {
    partner: ApiPartner;
}

export const AddAvtaleButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ partner, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddButton
                label="Ny avtale"
                aria-label={`Opprett ny avtale for ${partner.navn}`}
                {...props}
                onClick={onOpen}
            />
            <FormModal title={`Ny avtale for ${partner.navn}`} isOpen={isOpen} onClose={onClose}>
                <AvtaleForm partner={partner} afterSubmit={onClose} />
            </FormModal>
        </>
    );
};
