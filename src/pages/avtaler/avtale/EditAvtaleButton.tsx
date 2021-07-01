import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../../components/Modal';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { AvtaleForm } from './AvtaleForm';

interface Props {
    avtale: ApiAvtale;
}

export const EditAvtaleButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ avtale, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <EditButton label="Rediger avtale" {...props} onClick={onOpen} />
            <Modal title="Rediger avtale" isOpen={isOpen} onClose={onClose}>
                <AvtaleForm onSuccess={onClose} avtaleToEdit={avtale} />
            </Modal>
        </>
    );
};
