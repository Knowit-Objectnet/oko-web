import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { FormModal } from '../../../components/forms/FormModal';
import { PartnerForm } from './PartnerForm';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiPartner } from '../../../services/partner/PartnerService';

interface Props {
    partner: ApiPartner;
}

export const EditPartnerButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ partner, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <EditButton
                label="Rediger partner"
                aria-label={`Rediger informasjon for ${partner.navn}`}
                {...props}
                onClick={onOpen}
            />
            <FormModal title="Rediger samarbeidspartner" isOpen={isOpen} onClose={onClose}>
                <PartnerForm onSuccess={onClose} partnerToEdit={partner} />
            </FormModal>
        </>
    );
};
