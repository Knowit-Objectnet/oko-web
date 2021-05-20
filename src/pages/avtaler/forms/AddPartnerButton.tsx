import * as React from 'react';
import { Button, ButtonProps, Icon, useDisclosure } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { PartnerFormModal } from './PartnerFormModal';

export const AddPartnerButton: React.FC<ButtonProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button leftIcon={<Icon as={Plus} />} onClick={onOpen} {...props}>
                Legg til samarbeidspartner
            </Button>
            <PartnerFormModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};