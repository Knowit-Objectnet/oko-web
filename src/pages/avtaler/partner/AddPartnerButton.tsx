import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../../components/Modal';
import { AddButton } from '../../../components/buttons/AddButton';
import { PartnerForm } from './PartnerForm';

export const AddPartnerButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddButton label="Legg til samarbeidspartner" borderRadius="6" {...props} onClick={onOpen} />
            <Modal title="Legg til ny samarbeidspartner" isOpen={isOpen} onClose={onClose}>
                <PartnerForm onSuccess={onClose} />
            </Modal>
        </>
    );
};
