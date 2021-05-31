import * as React from 'react';
import {
    Heading,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalProps,
} from '@chakra-ui/react';
import Cross from '../../../assets/Cross.svg';
import { PartnerForm } from './PartnerForm';

export const PartnerFormModal: React.FC<Omit<ModalProps, 'children'>> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading as="h1" fontWeight="inherit" fontSize="inherit">
                        Legg til ny samarbeidspartner
                    </Heading>
                </ModalHeader>
                <ModalBody>
                    <PartnerForm afterSubmit={onClose} />
                </ModalBody>
                <ModalCloseButton aria-label="Lukk dialogboks" top="5" right="5">
                    <Icon as={Cross} height="6" width="auto" />
                </ModalCloseButton>
            </ModalContent>
        </Modal>
    );
};
