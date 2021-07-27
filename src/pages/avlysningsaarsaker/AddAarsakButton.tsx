import * as React from 'react';
import { Button, ButtonProps, Icon, useDisclosure } from '@chakra-ui/react';
import Plus from '../../assets/Plus.svg';
import { Modal } from '../../components/Modal';
import { AarsakForm } from './AarsakForm';

export const AddAarsakButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button leftIcon={<Icon as={Plus} />} {...props} onClick={onOpen}>
                Legg til avlysningsårsak
            </Button>
            <Modal title="Legg til ny årsak" isOpen={isOpen} onClose={onClose}>
                <AarsakForm onSuccess={onClose} />
            </Modal>
        </>
    );
};
