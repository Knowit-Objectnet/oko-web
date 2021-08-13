import * as React from 'react';
import { Button, ButtonProps, Icon, useDisclosure } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { Modal } from '../../../components/Modal';
import { PartnerForm } from './PartnerForm';

export const AddPartnerButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button leftIcon={<Icon as={Plus} />} {...props} onClick={onOpen}>
                Legg til samarbeidspartner
            </Button>
            <Modal title="Legg til ny samarbeidspartner" isOpen={isOpen} onClose={onClose}>
                <PartnerForm onSuccess={onClose} />
            </Modal>
        </>
    );
};
