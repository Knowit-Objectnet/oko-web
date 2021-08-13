import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../../components/Modal';
import { StasjonForm } from './StasjonForm';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';

interface Props {
    stasjon: ApiStasjon;
}

export const EditStasjonButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ stasjon, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <EditButton
                label="Rediger"
                aria-label={`Rediger informasjon for ${stasjon.navn}`}
                {...props}
                onClick={onOpen}
                borderRadius="6"
            />
            <Modal title="Rediger stasjon" isOpen={isOpen} onClose={onClose}>
                <StasjonForm onSuccess={onClose} stasjonToEdit={stasjon} />
            </Modal>
        </>
    );
};
