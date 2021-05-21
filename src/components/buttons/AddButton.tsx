import React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import Plus from '../../assets/Plus.svg';

interface Props {
    label: string;
    onClick: () => void;
}

export const AddButton: React.FC<Props & ButtonProps> = ({ label, onClick, ...props }) => (
    <Button leftIcon={<Icon as={Plus} />} onClick={onClick} {...props}>
        {label}
    </Button>
);
