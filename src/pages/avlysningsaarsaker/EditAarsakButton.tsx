import * as React from 'react';
import { ButtonProps, IconButton, useDisclosure, Icon } from '@chakra-ui/react';
import { Modal } from '../../components/Modal';
import { ApiAarsak } from '../../services/aarsak/AarsakService';
import { AarsakForm } from './AarsakForm';
import Pencil from '../../assets/Pencil.svg';

interface Props {
    aarsak: ApiAarsak;
}

export const EditAarsakButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ aarsak, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                icon={<Icon as={Pencil} backgroundColor="white" boxSize={5} />}
                aria-label="Rediger informasjon."
                colorScheme="transparent"
                {...props}
                onClick={onOpen}
            />
            <Modal title="Rediger årsak" isOpen={isOpen} onClose={onClose}>
                <AarsakForm onSuccess={onClose} aarsakToEdit={aarsak} />
            </Modal>
        </>
    );
};
