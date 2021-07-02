import * as React from 'react';
import { Button, ButtonProps, Icon, useDisclosure } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { FormModal } from '../../../components/forms/FormModal';
import { EkstraUttakForm } from './EkstraUttakForm';

export const AddEkstraUttakButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button leftIcon={<Icon as={Plus} />} {...props} onClick={onOpen}>
                Legg til ekstrauttak
            </Button>
            <FormModal title="Legg til ny stasjon" isOpen={isOpen} onClose={onClose}>
                <EkstraUttakForm onSuccess={onClose} />
            </FormModal>
        </>
    );
};
