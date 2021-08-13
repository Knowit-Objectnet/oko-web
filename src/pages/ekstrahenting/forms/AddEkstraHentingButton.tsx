import * as React from 'react';
import { Button, ButtonProps, Icon, useDisclosure } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { EkstraHentingForm } from './EkstraHentingForm';
import { useAuth } from '../../../auth/useAuth';
import { Modal } from '../../../components/Modal';

export const AddEkstraHentingButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useAuth();

    return (
        <>
            <Button leftIcon={<Icon as={Plus} />} {...props} onClick={onOpen}>
                Legg til ekstrahenting
            </Button>
            <Modal title="Legg til ny ekstrahenting" isOpen={isOpen} onClose={onClose}>
                <EkstraHentingForm onSuccess={onClose} stasjonId={user.isStasjon ? user.aktorId : undefined} />
            </Modal>
        </>
    );
};
