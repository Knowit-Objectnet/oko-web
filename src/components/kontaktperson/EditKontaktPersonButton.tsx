import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../Modal';
import { EditButton } from '../buttons/EditButton';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import { KontaktPersonForm } from './KontaktPersonForm';

interface Props {
    kontakt: ApiKontakt;
}

export const EditKontaktPersonButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ kontakt, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <EditButton
                label="Rediger"
                borderRadius="6"
                aria-label={`Rediger kontaktinformasjon for ${kontakt.navn}`}
                {...props}
                onClick={onOpen}
            />
            <Modal title="Rediger kontaktinformasjon" isOpen={isOpen} onClose={onClose}>
                <KontaktPersonForm onSuccess={onClose} kontaktToEdit={kontakt} />
            </Modal>
        </>
    );
};
