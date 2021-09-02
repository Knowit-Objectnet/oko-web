import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../../components/Modal';
import { AddButton } from '../../../components/buttons/AddButton';
import { AvtaleForm } from './AvtaleForm';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { FormRedirect, FormWrapper } from '../../../components/forms/FormRedirect';
import { useHistory } from 'react-router-dom';

interface Props {
    partner: ApiPartner;
}

export const AddAvtaleButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ partner, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();

    return (
        <>
            <AddButton
                label="Ny avtale"
                borderRadius="6"
                aria-label={`Opprett ny avtale for ${partner.navn}`}
                {...props}
                onClick={onOpen}
            />
            <FormWrapper to="ny" callback="e">
                <AvtaleForm partner={partner} onSuccess={onClose} />
            </FormWrapper>
        </>
    );
};
