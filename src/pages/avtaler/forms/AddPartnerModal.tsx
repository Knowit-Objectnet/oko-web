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

export const AddPartnerModal: React.FC<Omit<ModalProps, 'children'>> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent padding="5" paddingBottom="10">
                <ModalHeader>
                    <Heading as="h1" fontSize="4xl" fontWeight="normal">
                        Legg til ny samarbeidspartner
                    </Heading>
                </ModalHeader>
                <ModalCloseButton aria-label="Lukk dialogboks" top="5" right="5">
                    <Icon as={Cross} height="6" width="auto" />
                </ModalCloseButton>
                <ModalBody>
                    <PartnerForm afterSubmit={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
