import React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import Cross from '../../assets/Cross.svg';

interface Props {
    label: string;
}

export const DeleteButton = React.forwardRef<HTMLButtonElement, Props & ButtonProps>(function DeleteButton(
    { label, ...props },
    ref,
) {
    return (
        <Button ref={ref} leftIcon={<Icon as={Cross} />} {...props}>
            {label}
        </Button>
    );
});
