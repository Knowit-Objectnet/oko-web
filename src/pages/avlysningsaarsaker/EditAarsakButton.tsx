import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../components/Modal';
import { EditButton } from '../../components/buttons/EditButton';
import { ApiAarsak } from '../../services/aarsak/AarsakService';
import { AarsakForm } from './AarsakForm';

interface Props {
    aarsak: ApiAarsak;
}

export const EditAarsakButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ aarsak, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <EditButton label="Rediger" aria-label="Rediger informasjon." {...props} onClick={onOpen} />
            <Modal title="Rediger årsak" isOpen={isOpen} onClose={onClose}>
                <AarsakForm onSuccess={onClose} aarsakToEdit={aarsak} />
            </Modal>
        </>
    );
};
