import React from 'react';
import { VStack } from '@chakra-ui/react';
import { Modal } from '../../components/Modal';
import { CalendarEvent } from './hooks/useCalendarEvents';

interface Props {
    henting?: CalendarEvent;
    isOpen: boolean;
    onClose: () => void;
}

export const HentingDetails: React.FC<Props> = ({ henting, isOpen, onClose }) => {
    return (
        <Modal title={henting?.title ?? ''} isOpen={isOpen} onClose={onClose}>
            <VStack backgroundColor="surface" color="onSurface">
                {henting?.title}
            </VStack>
        </Modal>
    );
};
