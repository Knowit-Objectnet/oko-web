import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { FormModal } from '../../../components/forms/FormModal';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiKontakt } from '../../../services/aktor/KontaktService';
import { KontaktPersonFormFixCase } from './KontaktPersonFormFixCase';

interface Props {
    kontakt: ApiKontakt;
}

export const EditKontaktPersonButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ kontakt, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <EditButton
                label="Rediger"
                aria-label={`Rediger kontaktinformasjon for ${kontakt.navn}`}
                {...props}
                onClick={onOpen}
            />
            <FormModal title="Rediger kontaktinformasjon" isOpen={isOpen} onClose={onClose}>
                <KontaktPersonFormFixCase onSuccess={onClose} kontaktToEdit={kontakt} />
            </FormModal>
        </>
    );
};
