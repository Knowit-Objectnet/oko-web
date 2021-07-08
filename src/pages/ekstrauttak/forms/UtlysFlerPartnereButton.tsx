import * as React from 'react';
import { Button, ButtonProps, Icon, useDisclosure } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { ApiEkstraHenting } from '../../../services/henting/EkstraHentingService';
import { UtlysFlerePartnereForm } from './UtlysFlerePartnereForm';
import { Modal } from '../../../components/Modal';

interface Props {
    henting: ApiEkstraHenting;
}

export const UtlysFlerPartnereButton: React.FC<Omit<ButtonProps, 'onClick'> & Props> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button leftIcon={<Icon as={Plus} />} height="auto" {...props} onClick={onOpen}>
                Legg til flere
            </Button>
            <Modal title="Legg til flere partnere" isOpen={isOpen} onClose={onClose}>
                <UtlysFlerePartnereForm henting={props.henting} onSuccess={onClose} />
            </Modal>
        </>
    );
};
