import * as React from 'react';
import { Button, ButtonProps, Icon, useDisclosure } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { FormModal } from '../../../components/forms/FormModal';
import { StasjonForm } from './StasjonForm';

export const AddStasjonButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button leftIcon={<Icon as={Plus} />} {...props} onClick={onOpen}>
                Legg til stasjon
            </Button>
            <FormModal title="Legg til ny stasjon" isOpen={isOpen} onClose={onClose}>
                <StasjonForm afterSubmit={onClose} />
            </FormModal>
        </>
    );
};
