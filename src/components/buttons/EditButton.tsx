import React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import Pencil from '../../assets/Pencil.svg';

interface Props {
    label: string;
    onClick: () => void;
}

export const EditButton: React.FC<Props & ButtonProps> = ({ label, onClick, ...props }) => (
    <Button leftIcon={<Icon as={Pencil} />} onClick={onClick} {...props}>
        {label}
    </Button>
);
