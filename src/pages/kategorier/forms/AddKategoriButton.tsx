import * as React from 'react';
import { Button, ButtonProps, Icon, useDisclosure } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { Modal } from '../../../components/Modal';
import { KategoriForm } from './KategoriForm';

export const AddKategoriButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                borderRadius="6"
                aria-label="Opprett ny kategori"
                leftIcon={<Icon as={Plus} />}
                {...props}
                onClick={onOpen}
            >
                Legg til kategori
            </Button>
            <Modal title="Legg til ny kategori" isOpen={isOpen} onClose={onClose}>
                <KategoriForm onSuccess={onClose} />
            </Modal>
        </>
    );
};
