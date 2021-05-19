import React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import Cross from '../../assets/Cross.svg';

interface Props {
    label: string;
    onClick: () => void;
}

export const DeleteButton: React.FC<Props & ButtonProps> = ({ label, onClick, ...props }) => (
    <Button leftIcon={<Icon as={Cross} />} onClick={onClick} {...props}>
        {label}
    </Button>
);
