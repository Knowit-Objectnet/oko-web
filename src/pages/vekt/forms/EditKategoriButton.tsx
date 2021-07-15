import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../../components/Modal';
import { VektForm } from './VektForm';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiKategori } from '../../../services/kategori/KategoriService';

interface Props {
    kategori: ApiKategori;
}

export const EditKategoriButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ kategori, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <EditButton
                label="Rediger"
                aria-label={`Rediger informasjon for ${kategori.navn}`}
                {...props}
                onClick={onOpen}
            />
            <Modal title="Rediger kategori" isOpen={isOpen} onClose={onClose}>
                <VektForm onSuccess={onClose} />
            </Modal>
        </>
    );
};
