import * as React from 'react';
import { Button, ButtonProps, Icon, useDisclosure } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { EkstraUttakForm } from './EkstraUttakForm';
import { useAuth } from '../../../auth/useAuth';
import { Modal } from '../../../components/Modal';

export const AddEkstraUttakButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useAuth();

    return (
        <>
            <Button leftIcon={<Icon as={Plus} />} {...props} onClick={onOpen}>
                Legg til ekstrauttak
            </Button>
            <Modal title="Legg til nytt ekstrauttak" isOpen={isOpen} onClose={onClose}>
                <EkstraUttakForm onSuccess={onClose} stasjonId={user.isStasjon ? user.aktorId : undefined} />
            </Modal>
        </>
    );
};
