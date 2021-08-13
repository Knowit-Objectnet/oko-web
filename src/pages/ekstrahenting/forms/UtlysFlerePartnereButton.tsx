import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { ApiEkstraHenting } from '../../../services/henting/EkstraHentingService';
import { UtlysFlerePartnereForm } from './UtlysFlerePartnereForm';
import { Modal } from '../../../components/Modal';
import { AddButton } from '../../../components/buttons/AddButton';

interface Props {
    henting: ApiEkstraHenting;
}

export const UtlysFlerePartnereButton: React.FC<Omit<ButtonProps, 'onClick'> & Props> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddButton
                label="Legg til flere"
                borderRadius="6"
                aria-label="Legg til flere partnere på ekstrautlysningen"
                {...props}
                onClick={onOpen}
            />
            <Modal title="Legg til flere partnere" isOpen={isOpen} onClose={onClose}>
                <UtlysFlerePartnereForm henting={props.henting} onSuccess={onClose} />
            </Modal>
        </>
    );
};
