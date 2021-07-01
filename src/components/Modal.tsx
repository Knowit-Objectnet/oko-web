import * as React from 'react';
import {
    Heading,
    Icon,
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalProps,
} from '@chakra-ui/react';
import Cross from '../assets/Cross.svg';

interface Props {
    title: string;
}

export const Modal: React.FC<Props & ModalProps> = ({ title, children, isOpen, onClose }) => {
    return (
        <ChakraModal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading as="h1" fontWeight="inherit" fontSize="inherit">
                        {title}
                    </Heading>
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalCloseButton aria-label="Lukk dialogboks">
                    <Icon as={Cross} height="6" width="auto" />
                </ModalCloseButton>
            </ModalContent>
        </ChakraModal>
    );
};
