import * as React from 'react';
import {
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalProps,
} from '@chakra-ui/react';
import Cross from '../../assets/Cross.svg';
import { AddPartnerForm } from './AddPartnerForm';

export const AddPartnerModal: React.FC<Omit<ModalProps, 'children'>> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Legg til ny partner</ModalHeader>
                <ModalCloseButton aria-label="Lukk dialogboks">
                    <Icon as={Cross} height="5" width="auto" />
                </ModalCloseButton>
                <ModalBody>
                    <AddPartnerForm afterSubmit={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
